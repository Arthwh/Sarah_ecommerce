import ProductRepository from '../repositories/productRepository.js';
import ProductVariantRepository from '../repositories/productVariantRepository.js';
import WishlistService from './wishlistService.js';
import { calculatePageParams, createDataStructureForListProducts, createBreadcrumbs, capitalizeWords } from '../helpers/pageHelpers.js';
import pool from '../db.js';

class ProductService {
    static async listProductsByCategoryOrSubcategoryService(user = null, category, subcategory, limitParam, pageParam) {
        try {
            if (!category) {
                throw Error("Category missing.");
            }
            const totalProducts = (await ProductRepository.countTotalProducts(category, subcategory)).total_count;
            const { limit, offset, page, totalPages } = await calculatePageParams(limitParam, pageParam, totalProducts);
            let products = await ProductRepository.listProductsBySubcategoryRepository('name', category, subcategory, limit, offset);
            user ? products = await WishlistService.checkProductsInWishlist(user, products) : '';
            const results = products.length;
            const breadcrumbs = await createBreadcrumbs(null, category, subcategory);
            const title = subcategory ? `${capitalizeWords(subcategory)} ${category}` : `${capitalizeWords(category)}`;
            const data = await createDataStructureForListProducts(user, products, title, results, breadcrumbs, page, totalPages, offset, limit);
            return data;
        } catch (error) {
            console.error('Error getting products: ' + error.message);
            throw error;
        }
    }

    static async getSpecificProduct(user = null, id, sku) {
        try {
            let productData = {};
            if (!id) {
                throw Error("Product ID missing.");
            }
            if (!sku || sku === 'undefined') {
                productData = await ProductRepository.getProductAndFirstVariantByProductIdRepository(id);
            }
            else {
                productData = await ProductRepository.getProductByProductAndVariantIdRepository(id, sku);
            }
            if (user) {
                productData.product_in_wishlist = await WishlistService.checkProductIsAddedWishlist(user.id, productData.product_public_id);
            }
            const variantsData = await ProductVariantRepository.getAllProductVariantsByProductIdRepository(id);
            if (variantsData) {
                productData['variants'] = variantsData;
            }
            //Parte desnecessaria em novos produtos (já é atualizado o estoque total ao criar o produto)
            let productStock = 0;
            productData.variants.forEach(product => {
                productStock += product.variant_stock_quantity;
            });
            productData.total_stock_quantity = productStock;

            productData.product_description = await replaceLineBreakCharacterInDescription(productData.product_description)
            const category = productData.subcategories[0].category_name.toLowerCase();
            const subcategory = productData.subcategories[0].subcategory_name.toLowerCase();
            const breadcrumbs = await createBreadcrumbs(null, category, subcategory, productData);
            const data = await createDataStructureForListProducts(user, productData, null, null, breadcrumbs);

            return data;
        } catch (error) {
            console.error('Error getting product: ', error);
            throw error;
        }
    }

    static async getProductVariantData(sku) {
        try {
            if (!sku) {
                throw new Error('Product SKU missing.');
            }
            const variantData = await ProductVariantRepository.getVariantDataBySku(sku);
            variantData['product_description'] = await replaceLineBreakCharacterInDescription(variantData.product_description);
            return variantData;
        } catch (error) {
            console.error('Error getting product variant data: ', error);
            throw error;
        }
    }

    static async getProductVariantStockQuantity(sku) {
        try {
            const skuQuantity = await ProductRepository.getProductVariantStockQuantity(sku) || 0;
            return skuQuantity;
        } catch (error) {
            console.error('Error getting product variant stock quantity: ', error);
            throw error;
        }
    }

    static async createProductService(productData, files) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const variantsData = JSON.parse(productData.variants);
            let totalStock = 0;
            for (const variant of variantsData) {
                totalStock += parseInt(variant.variantInitialStock);
            }
            productData['productTotalStock'] = totalStock;
            const product_id = await ProductRepository.createProductRepository(client, productData);
            await ProductRepository.assignSubcategoryRepository(client, product_id, productData.subcategory)
            if (productData.variants) {
                const variants = await ProductVariantRepository.createProductVariantRepository(client, product_id, variantsData);
                const images = await ProductVariantRepository.insertVariantImages(client, files);
                await ProductVariantRepository.assignVariantImageRepository(client, variants, images);
            }
            await client.query('COMMIT')
            return { message: "Product created successfully" };
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error creating product: ' + error.message);
            throw Error('Error creating product: ' + error.message);
        } finally {
            client.release();
        }
    }

    static async getAllProductCategoriesAndSubcategories() {
        try {
            const rows = await ProductRepository.getCategoriesAndSubcategories();
            const categories = [];
            const categoriesMap = {};

            rows.forEach(row => {
                if (!categoriesMap[row.category_id]) {
                    const category = {
                        id: row.category_id,
                        name: row.category_name,
                        subcategories: []
                    };
                    categories.push(category);
                    categoriesMap[row.category_id] = category;
                }
                if (row.subcategory_id) {
                    categoriesMap[row.category_id].subcategories.push({
                        id: row.subcategory_id,
                        name: row.subcategory_name
                    });
                }
            });
            return categories;
        } catch (error) {
            console.error('Erro ao processar categorias e subcategorias:', error);
            throw error;
        }
    }

    static async getAllBrands() {
        try {
            const brands = await ProductRepository.getAllBrands();
            return brands;
        } catch (error) {
            console.error('Erro ao processar marcas:', error);
            throw error;
        }
    }

    static async getAllActiveProductColors() {
        try {
            const colors = await ProductRepository.getAllActiveProductColors();
            return colors;
        } catch (error) {
            console.error('Erro ao processar cores:', error);
            throw error;
        }
    }

    static async searchProducts(query) {
        try {
            return await ProductRepository.searchProducts(query);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            throw error;
        }
    }

    static async checkProductStock(productVariantId, quantity) {
        try {
            const stock = ProductVariantRepository.getVariantStock(productVariantId);
            if (!stock) {
                return false;
            }
            if (stock < quantity) {
                return false;
            }

            return true;
        } catch (error) {
            console.error('Erro ao verificar estoque:', error);
            throw error;
        }
    }

    static async reserveProductStock(client, productVariantId, quantity) {
        try {
            if (!productVariantId || !quantity) {
                throw new Error('Produto ou quantidade não informados');
            }
            await ProductVariantRepository.reserveStock(client, productVariantId, quantity);
        } catch (error) {
            console.error('Erro ao reservar estoque: ', error);
            throw Error('Erro ao reservar estoque: ', error);
        }
    }
}

async function replaceLineBreakCharacterInDescription(product_description) {
    return product_description.replace(/\r?\n/g, '<br>');
}

export default ProductService;
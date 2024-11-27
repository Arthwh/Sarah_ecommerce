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

    //FUNCIONANDO CERTO
    static async getSpecificProduct(user = null, id, sku) {
        try {
            let productData = {};

            if (!id) {
                throw Error("Product ID missing.");
            }
            if (!sku || sku === 'undefined') {
                //Pega a primeira variante com estoque
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

    //FUNCIONANDO CERTO
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

    //FUNCIONANDO CERTO
    static async createProductService(productData, files) {
        const client = await pool.connect();
        try {
            //Inicia a transaction
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
            //Commita as alterações se todas deram certo
            await client.query('COMMIT')
            return { message: "Product created successfully" };
        } catch (error) {
            // Se ocorrer algum erro, faz o rollback
            await client.query('ROLLBACK');
            console.error('Error creating product: ' + error.message);
            throw Error('Error creating product: ' + error.message);
        } finally {
            client.release();
        }
    }

    //FUNCIONANDO CERTO
    static async getAllProductCategoriesAndSubcategories() {
        try {
            const rows = await ProductRepository.getCategoriesAndSubcategories();
            const categories = [];
            const categoriesMap = {};

            rows.forEach(row => {
                // Adiciona uma nova categoria se ela ainda não existe no mapa
                if (!categoriesMap[row.category_id]) {
                    const category = {
                        id: row.category_id,
                        name: row.category_name,
                        subcategories: []
                    };
                    categories.push(category);
                    categoriesMap[row.category_id] = category;
                }
                // Adiciona subcategoria à categoria correspondente
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

    //FUNCIONANDO CERTO
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
            console.log(colors);
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
}

async function replaceLineBreakCharacterInDescription(product_description) {
    return product_description.replace(/\r?\n/g, '<br>');
}

export default ProductService;
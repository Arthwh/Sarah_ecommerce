import ProductRepository from '../repositories/productRepository.js';
import ProductVariantRepository from '../repositories/productVariantRepository.js';
import LandingPageRepository from '../repositories/landingPageRepository.js';
import { Product } from '../models/productModel.js';
import pool from '../db.js';

class ProductService {
    static async getSectionData({ sectionModel, contentType, sectionProductType, sectionTitle, sectionProductLimit, sectionProductTypeCategoryId, sectionProductTypeSubcategoryId, endDate, sectionPosition }) {
        try {
            if (sectionModel === 'carousel' || sectionModel === 'grid') {
                var products = [];
                switch (sectionProductType) {
                    case 'newArrivals':
                        products = await ProductRepository.getProductsByFilter_newArrivals(component.section_product_limit);
                        break;
                    case 'highestRated':
                        products = await ProductRepository.getProductsByFilter_highestRated(component.section_product_limit);
                        break;
                    case 'bestSelling':
                        console.log('bestSelling')
                        break;
                    case 'offers':
                        console.log('offers')
                        break;
                    case 'category':
                    case 'subcategory':
                        console.log('category or subcategory');
                        products = await ProductRepository.listProductsBySubcategoryRepository('id', sectionProductTypeCategoryId, sectionProductTypeSubcategoryId, sectionProductLimit, 0);
                        break;
                }
                return { products: products, view: sectionModel === 'carousel' ? 'carousel' : 'itemGrid' };
            }
        } catch (error) {
            console.error(`Error getting section data: ${error}`);
            throw Error(`Error getting section data: ${error.message}`)
        }
    }

    //FUNCIONANDO CERTO (Precisa terminar os tipos de produtos e de sections)
    static async getLandingPageData() {
        try {
            const components = await LandingPageRepository.getActiveLandingPageComponents();
            if (!components) {
                return {};
            };
            for (const component of components) {
                if (component.content_type === 'product') {
                    var products = [];
                    switch (component.section_product_type) {
                        case 'newArrivals':
                            products = await ProductRepository.getProductsByFilter_newArrivals(component.section_product_limit);
                            break;
                        case 'highestRated':
                            products = await ProductRepository.getProductsByFilter_highestRated(component.section_product_limit);
                            break;
                        case 'bestSelling':
                            console.log('bestSelling')
                            break;
                        case 'offers':
                            console.log('offers')
                            break;
                        case 'category':
                        case 'subcategory':
                            console.log('category or subcategory');
                            products = await ProductRepository.listProductsBySubcategoryRepository('id', component.section_product_type_category_id, component.section_product_type_subcategory_id, component.section_product_limit, 0);
                            break;
                    }
                    component.section_content = products;
                }
                else if (component.content_type === 'image' && component.section_model === 'banner') {
                    const bannerData = await LandingPageRepository.getBannerComponentData(component.id);
                    component.section_content = bannerData;
                }
            }
            return components;
        } catch (error) {
            console.error('Error getting LandingPage: ' + error);
            throw Error('Error getting LandingPage: ' + error.message);
        }
    }

    //FUNCIONANDO CERTO
    static async listProductsByCategoryOrSubcategoryService(category, subcategory, limitParam, pageParam) {
        try {
            if (!category) {
                throw Error("Category missing.");
            }
            const countProducts = await ProductRepository.countTotalProducts(category, subcategory);
            const totalProducts = countProducts.total_count
            const limit = parseInt(limitParam, 10) || 20;
            const totalPages = Math.ceil(totalProducts / limit);
            if (pageParam > totalPages) {
                pageParam = totalPages;
            }
            const page = parseInt(pageParam, 10) || 1;
            const offset = limit * (page - 1);

            const products = await ProductRepository.listProductsBySubcategoryRepository('name', category, subcategory, limit, offset);
            const results = products.length;
            var subcategoryCapitalized = '';
            subcategory ? subcategoryCapitalized = capitalizeWords(subcategory) : '';
            const categoryCapitalized = capitalizeWords(category);
            for (const product of products) {
                product.product_description = await replaceLineBreakCharacterInDescription(product.product_description);
            };
            const data = {
                products: products,
                page: {
                    title: subcategoryCapitalized ? `${subcategoryCapitalized} ${categoryCapitalized}` : categoryCapitalized,
                    quantResults: results,
                    breadcrumbs: [
                        { name: 'Início', url: '/' },
                        { name: categoryCapitalized, url: `/c/${category}` },
                        subcategoryCapitalized ? { name: subcategoryCapitalized, url: `/c/masculino/${subcategory}` } : null
                    ]
                },
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    itemsPerPage: limit,
                    offset: offset
                }
            }
            return data;
        } catch (error) {
            console.error('Error getting products: ' + error.message);
            throw error;
        }
    }

    //FUNCIONANDO CERTO
    static async getSpecificProduct(id, sku) {
        try {
            var productData = {};
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
            const variantsData = await ProductVariantRepository.getAllProductVariantsByProductIdRepository(id);
            if (variantsData) {
                productData['variants'] = variantsData;
            }
            var productStock = 0;
            productData.variants.forEach(product => {
                productStock += product.variant_stock_quantity;
            });
            productData.total_stock_quantity = productStock;
            productData.product_description = await replaceLineBreakCharacterInDescription(productData.product_description)
            const category = productData.subcategories[0].category_name;
            const subcategory = productData.subcategories[0].subcategory_name;
            const data = {
                product: productData,
                page: {
                    breadcrumbs: [
                        { name: 'Início', url: '/' },
                        { name: category, url: `/c/${category.toLowerCase()}` },
                        { name: subcategory, url: `/c/${category.toLowerCase()}/${subcategory.toLowerCase()}` },
                        { name: productData.product_name, url: `/p/${productData.product_public_id}` }
                    ]
                }
            }
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
            variantData['product_description'] = variantData.product_description.replace(/\r?\n/g, '<br>');
            return variantData;
        } catch (error) {
            console.error('Error getting product variant data: ', error);
        }
    }

    //FUNCIONANDO CERTO
    static async createProductService(productData, files) {
        const client = await pool.connect();
        try {
            //Inicia a transaction
            await client.query('BEGIN');
            const variantsData = JSON.parse(productData.variants);
            var totalStock = 0;
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
        }
        finally {
            client.release();
        }
    }

    static async updateProduct(id, productData) {
    }

    static async deleteProduct(id) {
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
}

function capitalizeWords(word) {
    const wordCapitalized = word.charAt(0).toUpperCase() + word.slice(1);
    return wordCapitalized;
}

async function replaceLineBreakCharacterInDescription(product_description) {
    return product_description.replace(/\r?\n/g, '<br>');
}

export default ProductService;
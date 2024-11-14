import ProductRepository from '../repositories/productRepository.js'
import ProductVariantRepository from '../repositories/productVariantRepository.js'
import {getLandingPageComponentsAndData_Mock, getProductInfo_Mock, updateProductVariantData_Mock } from '../controllers/mockProductData.js' // Mocks dos dados enquanto nao esta pronto essa parte no backend
import { Product } from '../models/productModel.js';
import pool from '../db.js';

class ProductService {

    static async getLandingPageData() {
        try {
            // return await ProductRepository.getLandingPageDataRepository();
            return await getLandingPageComponentsAndData_Mock();
        } catch (error) {
            console.error('Error getting LandingPage: ' + error.message);
            throw error;
        }
    }

    static async listProductsBySubcategoryService(subcategory, category) {
        try {
            if (!subcategory || !category) {
                throw Error("Category and subcategory invalid or missing.");
            }
            const products = await ProductRepository.listProductsBySubcategoryRepository(subcategory, category);
            const results = products.length;
            const subcategoryCapitalized = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
            const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1);
            const data = {
                products: products,
                page: {
                    title: `${subcategoryCapitalized} ${categoryCapitalized}`,
                    quantResults: results,
                    breadcrumbs: [
                        { name: 'Início', url: '/' },
                        { name: categoryCapitalized, url: `/${categoryCapitalized}` },
                        { name: subcategoryCapitalized, url: `/masculino/${subcategory}` }
                    ]
                },
                pagination: {
                    currentPage: 1,
                    totalPages: 1,
                    itemsPerPage: 10
                }
            }
            return data;
        } catch (error) {
            console.error('Error getting products by subcategory: ' + error.message);
            throw error;
        }
    }

    static async getSpecificProduct(id) {
        try {
            // const product = await ProductRepository.getProductByIdRepository(id);
            // const variants = await ProductVariantRepository.getProductVariantsByProductIdRepository(id);
            // console.log(product);
            // console.log(variants);
        } catch (error) {
            console.error('Error getting product: ' + error.message);
            throw error;
        }
    }

    static async getProductDataMock() {
        return await getProductInfo_Mock();
    }

    static async getProductVariantData(sku) {
        const data = await updateProductVariantData_Mock(sku);
        return data;
    }

    //FUNCIONANDO CERTO
    static async createProductService(productData, files) {
        const client = await pool.connect();
        try {
            //Inicia a transaction
            await client.query('BEGIN');
            const product_id = await ProductRepository.createProductRepository(client, productData);
            await ProductRepository.assignSubcategoryRepository(client, product_id, productData.subcategory)
            if (productData.variants) {
                const variants = await ProductVariantRepository.createProductVariantRepository(client, product_id, productData.variants);
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
}

export default ProductService;
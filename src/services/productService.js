import ProductRepository from '../repositories/productRepository.js'
import ProductVariantRepository from '../repositories/productVariantRepository.js'
import { getCategories_Mock, getLandingPageComponentsAndData_Mock, getProductsForList_Mock, getProductInfo_Mock, updateProductVariantData_Mock } from '../controllers/mockProductData.js' // Mocks dos dados enquanto nao esta pronto essa parte no backend
import { Product } from '../models/productModel.js';

class ProductService {

    static async getLandingPageData() {
        try {
            return await ProductRepository.getLandingPageDataRepository();
        } catch (error) {
            console.error('Error getting LandingPage: ' + error.message);
            throw error;
        }
    }

    //Dados de mock
    static async listProducts() {
        const data = await getProductsForList_Mock();
        return data;
    }

    //Dados de mock
    static async getSpecificProduct(id) {
        const data = await getProductInfo_Mock(id);
        return data;
    }

    //Dados de mock
    static async getProductVariantData(sku) {
        const data = await updateProductVariantData_Mock(sku);
        return data;
    }

    static async createProductService(productData, files) {
        try {
            const productResponse = await ProductRepository.createProductRepository(productData);
            const product_id = productResponse.id;
            console.log(productData)
            await ProductRepository.assignSubcategoryRepository(product_id, productData);
            if (productData.variants) {
                await ProductVariantRepository.createProductVariantRepository(product_id, productData, files);
            }
            return { message: "Product created successfully" };
        } catch (error) {
            console.error('Error creating product: ' + error.message);
            throw error;
        }
    }

    static async updateProduct(id, productData) {
    }

    static async deleteProduct(id) {
    }

    static async getAllProductCategoriesAndSubcategories() {
        try {
            const rows = await ProductRepository.getCategoriesAndSubcategories();
            // Organiza os dados
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

            console.log(categories);
            return categories;
        } catch (error) {
            console.error('Erro ao processar categorias e subcategorias:', error);
            throw error;
        }
    }
}

export default ProductService;
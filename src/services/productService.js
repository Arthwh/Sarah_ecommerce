import ProductRepository from '../repositories/productRepository.js'
import ProductVariantRepository from '../repositories/productVariantRepository.js'
import { getCategories_Mock, getLandingPageComponentsAndData_Mock, getProductsForList_Mock, getProductInfo_Mock, updateProductVariantData_Mock } from '../controllers/mockProductData.js' // Mocks dos dados enquanto nao esta pronto essa parte no backend

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
            await ProductRepository.assignCategoryRepository(product_id, productData);
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

    //Dados de mock
    static async getAllProductCategories() {
        const data = await getCategories_Mock();
        return data;
    }
}

export default ProductService;
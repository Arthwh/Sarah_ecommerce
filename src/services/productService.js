// import ProductModel from '../models/productModel.js';
import { getCategories_Mock, getLandingPageComponentsAndData_Mock, getProductsForList_Mock, getProductInfo_Mock, updateProductVariantData_Mock } from '../controllers/mockProductData.js' // Mocks dos dados enquanto nao esta pronto essa parte no backend

class ProductService {
    //Dados de mock
    static async getLandingPageData() {
        const data = await getLandingPageComponentsAndData_Mock();
        return data;
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

    static async createProduct(productData) {
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
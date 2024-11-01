// import ProductModel from '../models/productModel.js';
import { getCategories_Mock, getLandingPageComponentsAndData_Mock, getProductsForList_Mock, getProductInfo_Mock, updateProductVariantData_Mock } from '../controllers/mockProductData.js' // Mocks dos dados enquanto nao esta pronto essa parte no backend

class ProductService {
    //Dados de mock
    static async getLandingPageData() {
        const data = await getLandingPageComponentsAndData_Mock();
        return data;
    }

    static async listProducts() {
        const data = await getProductsForList_Mock();
        return data;
    }

    static async getSpecificProduct(id) {
        const data = await getProductInfo_Mock(id);
        return data;
    }

    static async getProductVariantData(sku) {
        console.log("sku: " + sku)
        const data = await updateProductVariantData_Mock(sku);
        console.log(data)
        return data;
    }

    static async createProduct(productData) {
        // return await ProductModel.createProduct(productData);
    }

    static async updateProduct(id, productData) {
        // return await ProductModel.updateProduct(id, productData);
    }

    static async deleteProduct(id) {
        // return await ProductModel.deleteProduct(id);
    }

    //Dados de mock
    static async getAllProductCategories() {
        const data = await getCategories_Mock();
        return data;
    }
}

export default ProductService;
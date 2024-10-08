import ProductModel from '../models/productModel.js';
import { getProducts, updateProductVariantDataMock, getProductInfo } from '../controllers/mockProductData.js';

class ProductService {
    static async getLandingPageData() {
        return {};
    }

    static async listProducts() {
        return await getProducts(); // Ou ProductModel.getAllProducts();
    }

    static async getProduct() {
        return await getProductInfo(); // Ou ProductModel.getProductById(id);
    }

    static async updateProductVariantData(sku) {
        return await updateProductVariantDataMock(sku);
    }

    static async createProduct(productData) {
        return await ProductModel.createProduct(productData);
    }

    static async updateProduct(id, productData) {
        return await ProductModel.updateProduct(id, productData);
    }

    static async deleteProduct(id) {
        return await ProductModel.deleteProduct(id);
    }
}

export default ProductService;
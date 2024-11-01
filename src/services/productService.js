import ProductModel from '../models/productModel.js';
import MockProductData from '../controllers/mockProductData.js'

class ProductService {
    static async getLandingPageData() {
        // return await ProductModel.getLandingPageData();
        return MockProductData.getLangingPageData();
    }

    static async listProducts() {
        return await ProductModel.getAllProducts();
    }

    static async getProduct() {
        return await ProductModel.getProductById(id);
    }

    static async updateProductVariantData(sku) {
        return await ProductModel.updateProductVariant(sku);
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
import ProductModel from '../models/productModel.js';
import { getProducts, updateProductVariantDataMock, getProductInfo } from '../controllers/mockProductData.js'

class ProductController {
    static async getLangingPage(req, res) {

        const data = {}
        res.render('landingPage', { data });
    }

    static async listProducts(req, res) {
        try {
            // const products = await ProductModel.getAllProducts();
            const data = await getProducts()
            console.log(data)
            res.render('productsList', { data });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar itens' });
        }
    }

    static async getProduct(req, res) {
        try {
            // const products = await ProductModel.getProductById(req.params.id);
            // if (!products) return res.status(404).json({ error: 'Produto não encontrado' });
            const data = await getProductInfo();
            res.render('product', { data });
            // res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar products' });
        }
    }

    static async updateProductVariantData(req, res) {
        try {
            const sku = req.params.id
            const data = await updateProductVariantDataMock(sku);
            if (data) {
                res.status(200).json(data);
            }
            res.status(404).json({ error: 'Produto não encontrado' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar itens' });
        }
    }

    static async createProduct(req, res) {
        try {
            const { brand_id, name, description, unit_price, total_stock_quantity, created_at, updated_at, is_active } = req.body;
            const newProduct = await ProductModel.createProduct({ brand_id, name, description, unit_price, total_stock_quantity, created_at, updated_at, is_active });
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar products', error });
        }
    }

    static async updateProduct(req, res) {
        try {
            const { brand_id, name, description, unit_price, total_stock_quantity, created_at, updated_at, is_active } = req.body;
            const updatedProduct = await ProductModel.updateProduct(req.params.id, { brand_id, name, description, unit_price, total_stock_quantity, created_at, updated_at, is_active });
            if (!updatedProduct) return res.status(404).json({ error: 'Produto não encontrado' });
            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const deletedProduct = await ProductModel.deleteProduct(req.params.id);
            if (!deletedProduct) return res.status(404).json({ error: 'Produto não encontrado' });
            res.json({ message: 'Produto deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar produto' });
        }
    }
}

export default ProductController;

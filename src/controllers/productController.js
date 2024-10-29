import ProductService from '../services/productService.js';

class ProductController {
    static async getLandingPage(req, res) {
        try {
            const components = await ProductService.getLandingPageData();
            res.render('client/landingPage', { data: { components } });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao carregar a página inicial' });
        }
    }

    static async listProducts(req, res) {
        try {
            const data = await ProductService.listProducts();
            res.render('productsList', { data });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar produtos' });
        }
    }

    static async getProduct(req, res) {
        try {
            const data = await ProductService.getProduct();
            res.render('product', { data });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    }

    static async updateProductVariantData(req, res) {
        try {
            const sku = req.params.id;
            const data = await ProductService.updateProductVariantData(sku);
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar dados da variante do produto' });
        }
    }

    static async createProduct(req, res) {
        try {
            const newProduct = await ProductService.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar produto' });
        }
    }

    static async updateProduct(req, res) {
        try {
            const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
            if (!updatedProduct) return res.status(404).json({ error: 'Produto não encontrado' });
            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const deletedProduct = await ProductService.deleteProduct(req.params.id);
            if (!deletedProduct) return res.status(404).json({ error: 'Produto não encontrado' });
            res.json({ message: 'Produto deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar produto' });
        }
    }
}

export default ProductController;
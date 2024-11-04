import ProductService from '../services/productService.js';

class ProductController {
    static async getLandingPage(req, res) {
        try {
            const user = req.session.user
            console.log("User: " + JSON.stringify(user))
            const components = await ProductService.getLandingPageData();
            res.render('client/landingPage', { data: { user: user, components: components } });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao carregar a página inicial' });
        }
    }

    static async getCategories(req, res) {
        try {
            const data = await ProductService.getAllProductCategories();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar categorias' });
        }
    }

    static async listProducts(req, res) {
        try {
            const user = req.session.user
            console.log("User: " + JSON.stringify(user))
            const data = await ProductService.listProducts();
            res.render('client/productsList', { data: { user: user, page: data.page, pagination: data.pagination, products: data.products } });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar produtos' });
        }
    }

    static async getSpecificProduct(req, res) {
        try {
            const user = req.session.user
            console.log("User: " + JSON.stringify(user))
            const id = req.params.id;
            if (!id) {
                res.status(404).json({ error: 'Código do produto não informado ou incorreto' })
            }
            const data = await ProductService.getSpecificProduct(id);
            res.render('client/product', { data: { user: user, page: data.page, product: data.product } });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    }

    static async getProductVariantData(req, res) {
        try {
            const sku = req.params.id;
            const data = await ProductService.getProductVariantData(sku);
            if (!data) {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar dados da variante do produto' });
        }
    }

    static async createProduct(req, res) {
        try {
            const productData = req.body;
            const files = req.files; // Todos os arquivos carregados
            console.log('Dados do produto:', productData);
            console.log("files: ", files)
            // Processar os arquivos
            if (files && files.length > 0) {
                files.forEach(file => {
                    console.log(`Arquivo recebido: ${file.originalname}`);
                });
            }
            const newProduct = await ProductService.createProductService(productData, files);
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
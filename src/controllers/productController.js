import ProductService from '../services/productService.js';

class ProductController {
    //mock
    static async getLandingPage(req, res) {
        try {
            const user = req.session.user
            const components = await ProductService.getLandingPageData();
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            res.render('client/landingPage', { data: { user: user, components: components, page: { mode: 'main', categories: categories } } });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao carregar a página inicial' });
        }
    }

    //mock
    static async getLandingPageForEdit(req, res) {
        try {
            const user = req.session.user
            const components = await ProductService.getLandingPageData();
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            res.render('client/landingPage', { data: { user: user, components: components, page: { mode: 'edit', categories: categories } } });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao carregar a página inicial' });
        }
    }

    static async getCategoriesAndSubcategories(req, res) {
        try {
            const data = await ProductService.getAllProductCategoriesAndSubcategories();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar categorias: ', error });
        }
    }

    //mock
    static async listProducts(req, res) {
        try {
            const user = req.session.user
            // const { filter, search, orderby, limit } = req.params
            // const data = await ProductService.listProducts(filter, search, orderby, limit);
            const data = await ProductService.listProductsMock();
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            res.render('client/productsList', { data: { user: user, page: { categories: categories, title: data.page.title, quantResults: data.page.quantResults, breadcrumbs: data.page.breadcrumbs }, pagination: data.pagination, products: data.products } });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar produtos' });
        }
    }

    static async listProductsBySubcategory(req, res) {
    }

    //mock
    static async getSpecificProduct(req, res) {
        try {
            const user = req.session.user
            // const id = req.params.id;
            // const sku = req.query.sku || '';
            // if (!id) {
            //     res.status(404).json({ error: 'Código do produto não informado ou incorreto' })
            // }
            // const data = await ProductService.getSpecificProduct(id, sku);
            const data = await ProductService.getProductDataMock();
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            res.render('client/product', { data: { user: user, page: { categories: categories }, product: data.product } });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    }

    //mock
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
            const files = req.files;
            const newProduct = await ProductService.createProductService(productData, files);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar produto: ' + error });
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
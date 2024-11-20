import ProductService from '../services/productService.js';

class ProductController {
    static async getLandingPage(req, res) {
        try {
            console.log('teste')
            const user = req.session.user;
            const components = await ProductService.getLandingPageData();
            console.log(components)
            // res.json({ components: components });
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            res.render('client/landingPage', { data: { user: user, components: components, page: { mode: 'main', categories: categories, displayRegisterModal: true } } });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao carregar a página inicial' });
        }
    }

    static async getLandingPageForEdit(req, res) {
        try {
            const user = req.session.user
            const components = await ProductService.getLandingPageData();
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            res.render('client/landingPage', { data: { user: user, components: components, page: { mode: 'edit', categories: categories, displayRegisterModal: true } } });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao carregar a página inicial' });
        }
    }

    //FUNCIONANDO CERTO
    static async getCategoriesAndSubcategories(req, res) {
        try {
            const data = await ProductService.getAllProductCategoriesAndSubcategories();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar categorias: ', error });
        }
    }

    //FUNCIONANDO CERTO
    static async getBrands(req, res) {
        try {
            const data = await ProductService.getAllBrands();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar marcas: ', error });
        }
    }

    static async getProductColors(req, res) {
        try {
            const data = await ProductService.getAllActiveProductColors();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar cores: ', error });
        }
    }

    //FUNCIONANDO CERTO
    static async listProductsByCategoryOrSubcategory(req, res) {
        try {
            const { category, subcategory } = req.params;
            const { limit, page } = req.query;
            const user = req.session.user;
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            const data = await ProductService.listProductsByCategoryOrSubcategoryService(category, subcategory, limit, page);
            if (!data) {
                return res.status(404).json({ error: 'Dados não encontrados' });
            }
            res.render('client/productsList', { data: { user: user, page: { categories: categories, displayRegisterModal: true, title: data.page.title, quantResults: data.page.quantResults, breadcrumbs: data.page.breadcrumbs }, pagination: data.pagination, products: data.products } });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produtos', error });
        }
    }

    //FUNCIONANDO CERTO
    static async getSpecificProduct(req, res) {
        try {
            const user = req.session.user;
            const { id } = req.params;
            const { sku } = req.query || undefined;
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            const data = await ProductService.getSpecificProduct(id, sku);
            if (!data) {
                return res.status(404).json({ error: 'Dados não encontrados' });
            }
            res.render('client/product', { data: { user: user, page: { categories: categories, displayRegisterModal: true, breadcrumbs: data.page.breadcrumbs }, product: data.product } });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    }

    //FUNCIONANDO CERTO
    static async getProductVariantData(req, res) {
        try {
            const { sku } = req.params;
            const data = await ProductService.getProductVariantData(sku);
            if (!data) {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar dados da variante do produto' });
        }
    }

    //FUNCIONANDO CERTO
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
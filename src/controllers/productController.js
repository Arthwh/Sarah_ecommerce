import ProductService from '../services/productService.js';

class ProductController {
    static async getCategoriesAndSubcategories(req, res) {
        try {
            const data = await ProductService.getAllProductCategoriesAndSubcategories();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar categorias: ', error });
        }
    }

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
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar cores', message: error.message });
        }
    }

    static async listProductsByCategoryOrSubcategory(req, res) {
        try {
            const { category, subcategory } = req.params;
            const { limit, page } = req.query;
            const user = req.session.user;
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            const data = await ProductService.listProductsByCategoryOrSubcategoryService(user, category, subcategory, limit, page);
            if (!data) {
                return res.status(404).json({ error: 'Dados não encontrados' });
            }
            data.page.categories = categories;
            data.page.displayRegisterModal = true;
            res.render('client/productsList', { data });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produtos: ', error });
        }
    }

    static async getSpecificProduct(req, res) {
        try {
            const user = req.session.user;
            const { id } = req.params;
            const { sku } = req.query || undefined;
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            const data = await ProductService.getSpecificProduct(user, id, sku);
            if (!data) {
                return res.status(404).json({ error: 'Dados não encontrados' });
            }
            data.page.categories = categories;
            data.page.displayRegisterModal = true;
            res.render('client/product', { data });
        } catch (error) {
            res.status(500).json({ error: `Erro ao buscar produto: ${error}` });
        }
    }

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

    static async getProductVariantStockQuantity(req, res) {
        try {
            const { sku } = req.params
            if (!sku) {
                return res.status(400).json({ error: 'SKU não informado' });
            }
            const variantStock = await ProductService.getProductVariantStockQuantity(sku);
            res.status(200).json({ stock_quantity: variantStock });
        } catch (error) {
            res.status(500).json({ error: error.message });
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
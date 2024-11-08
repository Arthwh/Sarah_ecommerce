import ProductService from "../services/productService.js";

class ErrorController {
    static async renderErrorPage(req, res, message, title) {
        try {
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            res.render('client/error', { data: { title: title, message: message, page: { categories: categories } } })
        } catch (error) {
            res.status(500).json();
        }
    }
}

export default ErrorController
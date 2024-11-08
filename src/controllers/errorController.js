import ProductService from "../services/productService.js";

class ErrorController {
    static async renderErrorPage(req, res, message, title, buttonAction, buttonText, link, linkText) {
        try {
            const user = req.session.user;
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            res.render('client/error', { data: { user: user, title: title, message: message, buttonAction: buttonAction, buttonText: buttonText, link: link, linkText: linkText, page: { categories: categories } } })
        } catch (error) {
            res.status(500).json();
        }
    }
}

export default ErrorController
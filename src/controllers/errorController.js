import ProductService from "../services/productService.js";

class ErrorController {
    static async renderUnauthorizedPage(req, res, next, message, title, buttonAction, buttonText, link, linkText) {
        try {
            const user = req.session.user;
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            res.render('client/unauthorized', { data: { user: user, title: title, message: message, buttonAction: buttonAction, buttonText: buttonText, link: link, linkText: linkText, page: { categories: categories, displayRegisterModal: true } } })
        } catch (error) {
            res.status(500).json();
        }
    }
}

export default ErrorController
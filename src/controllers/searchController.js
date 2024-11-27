import SearchService from '../services/searchService.js';
import ProductService from '../services/productService.js';

class SearchController {
    static async searchProducts(req, res) {
        try {
            const user = req.session.user;
            const { query, page, limit } = req.query;

            const searchResults = await SearchService.searchProducts(user, query, limit, page);
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();

            searchResults.page.categories = categories;
            searchResults.page.displayRegisterModal = true;

            res.render('client/productsList', { data: searchResults });
        } catch (error) {
            console.error("Error searching products:", error.message);
            res.status(500).send("Internal Server Error: " + error.message);
        }
    }
}

export default SearchController;
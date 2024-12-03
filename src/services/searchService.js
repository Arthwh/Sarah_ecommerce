
import ProductRepository from '../repositories/productRepository.js';
import WishlistService from '../services/wishlistService.js';
import { calculatePageParams, createDataStructureForListProducts, createBreadcrumbs } from '../helpers/pageHelpers.js';

class SearchService {
    static async searchProducts(user = null, query, limitParam, pageParam) {
        try {
            if (!query) {
                throw Error("Search query is missing.");
            }
            const totalProducts = (await ProductRepository.countTotalSearchResults(query)).total_count;
            const { limit, totalPages, page, offset } = await calculatePageParams(limitParam, pageParam, totalProducts);
            let products = await ProductRepository.searchProductsByQuery(query, limit, offset);
            user ? products = await WishlistService.checkProductsInWishlist(user, products) : '';
            const results = products.length;
            const breadcrumbs = await createBreadcrumbs(query);
            const title = `Resultados da busca por: ${query}`;
            const data = await createDataStructureForListProducts(user, products, title, results, breadcrumbs, page, totalPages, offset, limit);

            return data;
        } catch (error) {
            console.error('Error searching products: ' + error.message);
            throw error;
        }
    }
}

export default SearchService;
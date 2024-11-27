
import ProductRepository from '../repositories/productRepository.js';
import WishlistService from '../services/wishlistService.js';
import { calculatePageParams, createDataStructureForListProducts, createBreadcrumbs } from '../helpers/pageHelpers.js';

class SearchService {
    static async searchProducts(user = null, query, limitParam, pageParam) {
        try {
            if (!query) {
                throw Error("Search query is missing.");
            }

            // Contar o total de produtos encontrados pela busca
            const totalProducts = (await ProductRepository.countTotalSearchResults(query)).total_count;
            const { limit, totalPages, page, offset } = await calculatePageParams(limitParam, pageParam, totalProducts);

            // Buscar produtos
            let products = await ProductRepository.searchProductsByQuery(query, limit, offset);
            // Verificar se o usuário tem produtos na wishlist (opcional)
            user ? products = await WishlistService.checkProductsInWishlist(user, products) : '';

            const results = products.length;

            // Preparar dados para renderização
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
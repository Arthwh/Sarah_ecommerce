
import ProductRepository from '../repositories/productRepository.js';
import WishlistService from '../services/wishlistService.js';

class SearchService {
    static async searchProducts(user = null, query, limitParam, pageParam) {
        try {
            if (!query) {
                throw Error("Search query is missing.");
            }

            // Contar o total de produtos encontrados pela busca
            const countProducts = await ProductRepository.countTotalSearchResults(query);
            const totalProducts = countProducts.total_count;
            const limit = parseInt(limitParam, 10) || 20;
            const totalPages = Math.ceil(totalProducts / limit);
            const page = Math.min(parseInt(pageParam, 10) || 1, totalPages);
            const offset = limit * (page - 1);

            // Buscar produtos
            let products = await ProductRepository.searchProductsByQuery(query, limit, offset);

            // Verificar se o usuário tem produtos na wishlist (opcional)
            if (user) {
                products = await WishlistService.checkProductsInWishlist(user, products);
            }

            const results = products.length;

            // Preparar dados para renderização
            const data = {
                products: products,
                page: {
                    title: `Busca por "${query}"`,
                    quantResults: results,
                    breadcrumbs: [
                        { name: 'Início', url: '/' },
                        { name: `Busca por "${query}"`, url: `/search?q=${query}` }
                    ]
                },
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    itemsPerPage: limit,
                    offset: offset
                },
                user: user || {}  // Adiciona os dados do usuário, caso exista
            };

            return data;
        } catch (error) {
            console.error('Error searching products: ' + error.message);
            throw error;
        }
    }
}

export default SearchService;
import SearchService from '../services/searchService.js';
import ProductRepository from '../repositories/productRepository.js';
import ProductService from '../services/productService.js';

class SearchController {
    static async searchProducts(req, res) {
        try {
            const { query, page = 1, limit = 20 } = req.query;

            if (!query) {
                throw new Error("Search query is missing.");
            }

            // Obter os produtos que correspondem à pesquisa
            const searchResults = await ProductRepository.searchProducts(query, limit, page);

            if (!searchResults || !Array.isArray(searchResults.products)) {
                throw new Error("No products found.");
            }

            // Contar o número total de resultados
            const totalResults = searchResults.totalCount;
            const totalPages = Math.ceil(totalResults / limit);

            if (page > totalPages) {
                page = totalPages;
            }

            // Buscar as categorias (ou qualquer outro dado esperado pelo template)
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();

            const data = {
                products: searchResults.products || [],  // Garantir que products seja sempre um array
                page: {
                    title: `Resultados para: ${query}`,
                    quantResults: totalResults,
                    categories: categories,  // Passar as categorias
                    breadcrumbs: [
                        { name: 'Início', url: '/' },
                        { name: 'Busca', url: `/search?query=${query}` }
                    ]
                },
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    itemsPerPage: limit,
                    offset: (page - 1) * limit
                }
            };

            return res.render('client/productsList', { data });
        } catch (error) {
            console.error("Error searching products:", error.message);
            res.status(500).send("Internal Server Error: " + error.message); // Mostra a mensagem de erro no response
        }
    }
}

export default SearchController;
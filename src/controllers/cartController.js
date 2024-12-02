import CartService from '../services/cartService.js';
import ProductService from '../services/productService.js';

class CartController {
    static async getCartPage(req, res) {
        try {
            const user = req.session.user;
            const data = await CartService.getCartPageData(user);
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            data.page.categories = categories;

            res.render('client/cart', { data });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro ao obter página de carrinho: ', error });
        }
    }

    static async getCartItemsByUser(req, res) {
        try {
            const user = req.session.user;
            const userId = user.id;
            const cartItems = await CartService.getCart(userId);

            res.status(200).json({ success: true, cart: cartItems });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Erro ao obter carrinho:', message: error.message });
        }
    }

    static async addToCart(req, res) {
        try {
            const user = req.session.user;
            const { product_sku, quantity } = req.body;
            await CartService.addToCart(user, product_sku, quantity);
            const cartCount = await CartService.getUserCartCount(user)
            req.session.user.cart = {
                ...req.session.user.cart,
                count: cartCount,
            };
            res.status(200).json({ success: true, message: "Produto adicionado ao carrinho!" });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Erro ao adicionar produto ao carrinho:', message: error.message });
        }
    }

    static async removeFromCart(req, res) {
        try {
            const user = req.session.user;
            const { product_sku, quantity } = req.body;
            await CartService.removeFromCart(user, product_sku, quantity);
            const cartCount = await CartService.getUserCartCount(user)
            req.session.user.cart = {
                ...req.session.user.cart,
                count: cartCount,
            };
            res.status(200).json({ success: true, message: "Produto removido do carrinho!" });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Erro ao remover produto ao carrinho:', message: error.message });
        }
    }
}

export default CartController;

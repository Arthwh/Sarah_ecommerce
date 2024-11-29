import CartService from '../services/cartService.js';

class CartController {
    static async getCart(req, res) {
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
            const userId = user.id;
            const { productVariantId, quantity } = req.body;
            await CartService.addToCart(userId, productVariantId, quantity);
            res.status(201).json({ success: true, message: "Produto adicionado ao carrinho!" });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Erro ao adicionar produto ao carrinho:', message: error.message });
        }
    }

    static async removeFromCart(req, res) {
        try {
            const user = req.session.user;
            const userId = user.id;
            const { productVariantId } = req.params;
            await CartService.removeFromCart(userId, productVariantId);
            res.status(200).json({ success: true, message: "Produto removido do carrinho!" });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Erro ao remover produto ao carrinho:', message: error.message });
        }
    }
}

export default CartController;

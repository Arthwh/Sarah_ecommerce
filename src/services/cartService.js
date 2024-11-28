import CartRepository from '../repositories/cartRepository.js';

class CartService {
    static async getCart(userId) {
        return await CartRepository.getCartItems(userId);
    }

    static async addToCart(userId, productId, quantity) {
        return await CartRepository.addCartItem(userId, productId, quantity);
    }

    static async removeFromCart(userId, productId) {
        return await CartRepository.removeCartItem(userId, productId);
    }
}

export default CartService;

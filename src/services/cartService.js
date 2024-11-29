import CartRepository from '../repositories/cartRepository.js';

class CartService {
    static async getCart(userId) {
        return await CartRepository.getCartItems(userId);
    }

    static async addToCart(userId, productVariantId, quantity) {
        return await CartRepository.addCartItem(userId, productVariantId, quantity);
    }

    static async removeFromCart(userId, productVariantId) {
        return await CartRepository.removeCartItem(userId, productVariantId);
    }
}

export default CartService;

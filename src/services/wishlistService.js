import WishlistRepository from "../repositories/wishlistRepository.js";

class WishlistService {
    static async getWishlistItemsByUser(user) {
        try {
            const userId = user.id;
            const wishlistItems = await WishlistRepository.fetchWishlistItemsByUserId(userId);
            return wishlistItems;
        } catch (error) {
            console.error('Failed to get wishlist items by user id: ', error.message)
            throw new Error('Failed to get wishlist items by user id: ', error.message);
        }
    }

    static async checkProductsInWishlist(user, products) {
        try {
            const wishlistItems = await this.getWishlistItemsByUser(user);
            const wishlistItemsMap = wishlistItems.map(item => item.product_public_id);

            for (const product of products) {
                if (wishlistItemsMap.includes(product.product_public_id)) {
                    product.product_in_wishlist = true;
                }
                else {
                    product.product_in_wishlist = false;
                }
            }

            return products
        } catch (error) {
            console.error('Failed to check products in wishlist: ', error)
            throw new Error('Failed to check products in wishlist: ', error.message);
        }
    }

    static async checkProductIsAddedWishlist(userId, productPublicId) {
        try {
            const inWishlist = await WishlistRepository.checkProductIsAddedWishlist(userId, productPublicId);
            return inWishlist;
        } catch (error) {
            console.error('Failed to check product is added wishlist: ', error);
            throw new Error('Failed to check product is added wishlist: ', error.message);
        }
    }

    static async addProductToWishlist(userId, productPublicId) {
        try {
            await WishlistRepository.addProductToWishlist(userId, productPublicId);
        } catch (error) {
            console.error('Failed to add product to wishlist: ', error);
            throw new Error('Failed to add product to wishlist: ', error.message);
        }
    }

    static async removeProductFromWishlist(userId, productPublicId) {
        try {
            await WishlistRepository.removeProductFromWishlist(userId, productPublicId);
        } catch (error) {
            console.error('Failed to remove product from wishlist: ', error);
            throw new Error('Failed to remove product from wishlist: ', error.message);
        }
    }
}

export default WishlistService;
import WishlistService from "../services/wishlistService.js";

class WishlistController {
    static async getWishlistItemsByUser(req, res) {
        try {
            const user = req.session.user;
            if (!user) {
                return res.status(401).json({ message: 'You must be logged in to view your wishlist' });
            }
            const wishlistItems = await WishlistService.getWishlistItemsByUser(user);
            return res.status(200).json(wishlistItems);
        } catch (error) {
            return res.status(500).json({ message: `Error fetching wishlist items: ${error.message}` });
        }
    }

    static async checkProductInWishlist(req, res) {
        try {
            const { id, productId } = req.params;

            if (!id) {
                return res.status(401).json({ message: 'You must be logged in to view your wishlist' });
            }
            if (!productId) {
                return res.status(400).json({ message: 'Product ID is required' });
            }
            const inWishlist = await WishlistService.checkProductIsAddedWishlist(id, productId);
            res.status(200).json({ inWishlist: inWishlist });
        } catch (error) {
            return res.status(500).json({ message: `Error checking product in wishlist: ${error.message}` });
        }
    }

    static async addProductToWishlist(req, res) {
        try {
            const { id, productId } = req.params;

            if (!id) {
                return res.status(401).json({ message: 'You must be logged in to add products to your wishlist' });
            }
            if (!productId) {
                return res.status(400).json({ message: 'Product ID is required' });
            }

            await WishlistService.addProductToWishlist(id, productId);
            return res.status(200).json({ message: 'Product added to wishlist' });
        } catch (error) {
            return res.status(500).json({ message: `Error adding product to wishlist: ${error.message}` });
        }
    }

    static async removeProductFromWishlist(req, res) {
        try {
            const { id, productId } = req.params;

            if (!id) {
                return res.status(401).json({ message: 'You must be logged in to add products to your wishlist' });
            }
            if (!productId) {
                return res.status(400).json({ message: 'Product ID is required' });
            }

            await WishlistService.removeProductFromWishlist(id, productId);
            res.status(200).json({ message: 'Product removed from wishlist' });
        } catch (error) {
            return res.status(500).json({ message: `Error removing product from wishlist: ${error.message}` });
        }
    }
}

export default WishlistController;
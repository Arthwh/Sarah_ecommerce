import express from 'express';
import { checkAuth } from '../middlewares/auth.js';
import WishlistController from '../controllers/wishlistController.js';

const router = express.Router();

router.get('/api/wishlist/:id', checkAuth, WishlistController.getWishlistItemsByUser);
router.get('/api/wishlist/product/:id/:productId', checkAuth, WishlistController.checkProductInWishlist);
router.get('/api/wishlist/add/:id/:productId', checkAuth, WishlistController.addProductToWishlist);
router.get('/api/wishlist/remove/:id/:productId', checkAuth, WishlistController.removeProductFromWishlist);

export default router;
import express from 'express';
import { checkAuth } from '../middlewares/auth.js';
import CartController from '../controllers/cartController.js';

const router = express.Router();

router.get('/cart/:id', checkAuth, CartController.getCartItemsByUser);
router.post('/cart', checkAuth, CartController.addToCart);
router.delete('/cart', checkAuth, CartController.removeFromCart);
router.delete('/cart/all', checkAuth, CartController.clearCart);

router.get('/cart', checkAuth, CartController.getCartPage)

export default router;

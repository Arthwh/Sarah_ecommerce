import express from 'express';
import { checkAuth } from '../middlewares/auth.js';
import CartController from '../controllers/cartController.js';

const router = express.Router();

router.get('/cart', checkAuth, CartController.getCart);
router.post('/cart', checkAuth, CartController.addToCart);
router.delete('/cart/:productId', checkAuth, CartController.removeFromCart);

export default router;

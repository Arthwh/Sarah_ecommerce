import express from 'express';
import { checkAuth } from '../middlewares/auth.js';
import OrderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/orders', checkAuth, OrderController.createOrder);
router.get('/orders', checkAuth, OrderController.getOrdersByUser);
router.get('/orders/:orderId', checkAuth, OrderController.getOrderDetails);

export default router;
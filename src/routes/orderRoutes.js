import express from 'express';
import { checkAuth, isAdmin } from '../middlewares/auth.js';
import OrderController from '../controllers/orderController.js';

const router = express.Router();

// Acesso do usuário
router.get('/checkout', checkAuth, OrderController.getCheckoutComponent)
router.post('/checkout', checkAuth, OrderController.createOrder);
router.get('/orders/user/all', checkAuth, OrderController.getOrdersByUser);
router.get('/orders/user/open', checkAuth, OrderController.getUserOpenOrders);
router.get('/orders/user/finished', checkAuth, OrderController.getUserFinishedOrders);
router.get('/orders/user/:orderId', checkAuth, OrderController.getOrderDetails);
router.get('/api/orders', checkAuth, OrderController.getUserOrdersComponent)

// Acesso do administrador
router.get('/orders/all', isAdmin, OrderController.getAllOrders);
router.get('/orders/open', isAdmin, OrderController.getOpenOrders);
router.get('/orders/finished', isAdmin, OrderController.getFinishedOrders);

export default router;
import OrderService from '../services/orderService.js';

class OrderController {
    static async createOrder(req, res) {
        const userId = req.user.id;
        const { address_id, payment_id, total_price, status, items } = req.body;

        try {
            const order = await OrderService.createOrder(userId, address_id, payment_id, total_price, status, items);
            res.status(201).json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar pedido.' });
        }
    }

    static async getOrdersByUser(req, res) {
        const userId = req.user.id;

        try {
            const orders = await OrderService.getOrdersByUser(userId);
            res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter pedidos.' });
        }
    }

    static async getOrderDetails(req, res) {
        const { orderId } = req.params;

        try {
            const order = await OrderService.getOrderDetails(orderId);
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({ message: 'Pedido não encontrado.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter detalhes do pedido.' });
        }
    }
}

export default OrderController;

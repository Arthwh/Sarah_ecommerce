import OrderRepository from '../repositories/orderRepository.js';

class OrderService {
    static async createOrder(userId, addressId, paymentId, totalPrice, status, items) {
        try {
            const order = await OrderRepository.createOrder(userId, addressId, paymentId, totalPrice, status);
            const orderItems = await OrderRepository.addOrderItems(order.id, items);
            order.items = orderItems;
            const payment = await OrderRepository.getPaymentByOrderId(order.id);
            order.payment = payment;
            return order;
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            throw Error('Erro ao criar pedido.');
        }
    }

    static async getOrdersByUser(userId) {
        try {
            const orders = await OrderRepository.getOrdersByUser(userId);
            return orders;
        } catch (error) {
            console.error('Erro ao obter pedidos:', error);
            throw Error('Erro ao obter pedidos.');
        }
    }

    static async getOrderDetails(orderId) {
        try {
            const order = await OrderRepository.getOrderById(orderId);
            if (order) {
                const items = await OrderRepository.getOrderItems(orderId);
                order.items = items;
                const payment = await OrderRepository.getPaymentByOrderId(orderId);
                order.payment = payment;
            }
            return order;
        } catch (error) {
            console.error('Erro ao obter detalhes do pedido:', error);
            throw Error('Erro ao obter detalhes do pedido.');
        }
    }
}

export default OrderService;

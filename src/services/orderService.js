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

    static async getOrdersByUser(user) {
        try {
            const orders = await OrderRepository.getOrdersByUser(user.id);
            // const orders = [
            //     {
            //         order_id: "1",
            //         order_public_id: "PED12345",
            //         order_total_price: 259.90,
            //         order_status: "Entregue",
            //         status: "Pagamento Confirmado",
            //         created_at: "2024-10-25T14:45:00Z",
            //         order_total_products: 3
            //     },
            //     {
            //         order_id: "2",
            //         order_public_id: "PED12346",
            //         order_total_price: 89.90,
            //         order_status: "Em Transporte",
            //         status: "Pagamento Confirmado",
            //         created_at: "2024-11-01T10:30:00Z",
            //         order_total_products: 1
            //     },
            //     {
            //         order_id: "3",
            //         order_public_id: "PED12347",
            //         order_total_price: 450.00,
            //         order_status: "Processando",
            //         status: "Pagamento Pendente",
            //         created_at: "2024-11-15T09:20:00Z",
            //         order_total_products: 5
            //     },
            //     {
            //         order_id: "4",
            //         order_public_id: "PED12348",
            //         order_total_price: 129.99,
            //         order_status: "Cancelado",
            //         status: "Pagamento Rejeitado",
            //         created_at: "2024-10-20T16:10:00Z",
            //         order_total_products: 2
            //     },
            // ]
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

    static async getUserOpenOrders(userId) {
        try {
            const orders = await OrderRepository.getUserOpenOrders(userId);
            return orders;
        } catch (error) {
            console.error('Erro ao obter pedidos:', error);
            throw Error('Erro ao obter pedidos.');
        }
    }

    static async getUserFinishedOrders(userId) {
        try {
            const orders = await OrderRepository.getUserFinishedOrders(userId);
            return orders;
        } catch (error) {
            console.error('Erro ao obter pedidos:', error);
            throw Error('Erro ao obter pedidos.');
        }
    }

    static async getOpenOrders() {
        try {
            const orders = await OrderRepository.getOpenOrders();
            return orders;
        } catch (error) {
            console.error('Erro ao obter pedidos:', error);
            throw Error('Erro ao obter pedidos.');
        }
    }

    static async getFinishedOrders() {
        try {
            const orders = await OrderRepository.getFinishedOrders();
            return orders;
        } catch (error) {
            console.error('Erro ao obter pedidos:', error);
            throw Error('Erro ao obter pedidos.');
        }
    }

    static async getAllOrders() {
        try {
            const orders = await OrderRepository.getAllOrders();
            return orders;
        } catch (error) {
            console.error('Erro ao obter pedidos:', error);
            throw Error('Erro ao obter pedidos.');
        }
    }

}

export default OrderService;

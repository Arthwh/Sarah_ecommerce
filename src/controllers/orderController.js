import OrderService from '../services/orderService.js';
import ProductService from '../services/productService.js';

class OrderController {
    static async getCheckoutComponent(req, res) {
        try {
            const user = req.session.user;
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            const data = await OrderService.getCheckoutComponentData(user);
            data.page.categories = categories;
            res.render('client/checkout', { data: data });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter dados para o checkout: ' + error.message });
        }
    }

    static async getUserOrdersComponent(req, res) {
        try {
            const user = req.session.user;
            const userOrders = await OrderService.getOrdersByUser(user);
            res.render("client/partials/userPageComponents/orders", { sectionData: userOrders });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter pedidos: ' + error.message });
        }
    }

    static async getOrderDetailsComponent(req, res) {
        try {
            const user = req.session.user;
            const orderId = req.params.id;
            if (!orderId) {
                res.status(400).json({ message: 'Id do pedido não informado.' });
            }

            const orderData = await OrderService.getOrderDetails(user, orderId);
            res.render('client/partials/userPageComponents/orderDetails', { sectionData: orderData });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter detalhes do pedido: ' + error.message });
        }
    }

    static async createOrder(req, res) {
        try {
            const user = req.session.user;
            const { addressId, creditCardData, paymentMethod, cart } = req.body;
            const order = await OrderService.processCheckout(user, addressId, creditCardData, paymentMethod, cart);
            res.status(201).json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Erro ao criar pedido.' });
        }
    }

    static async getOrdersByUser(req, res) {
        const user = req.session.user;
        const userId = user.id;

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

    static async getUserOpenOrders(req, res) {
        const user = req.session.user;
        const userId = user.id;

        try {
            const orders = await OrderService.getUserOpenOrders(userId);
            res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter pedidos.' });
        }
    }

    static async getUserFinishedOrders(req, res) {
        const user = req.session.user;
        const userId = user.id;

        try {
            const orders = await OrderService.getUserFinishedOrders(userId);
            res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter pedidos.' });
        }
    }

    static async getOpenOrders(req, res) {
        try {
            const orders = await OrderService.getOpenOrders();
            res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter pedidos.' });
        }
    }

    static async getFinishedOrders(req, res) {
        try {
            const orders = await OrderService.getFinishedOrders();
            res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter pedidos.' });
        }
    }

    static async getAllOrders(req, res) {
        try {
            const orders = await OrderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter pedidos.' });
        }
    }

}

export default OrderController;

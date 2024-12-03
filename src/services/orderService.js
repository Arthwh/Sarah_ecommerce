import OrderRepository from '../repositories/orderRepository.js';
import AddressService from '../services/addressService.js';
import CartService from './cartService.js';
import PaymentService from './paymentService.js';

import pool from "../db.js";
import ProductService from './productService.js';

class OrderService {
    static async getCheckoutComponentData(user) {
        try {
            const { addresses } = await AddressService.getAddressesByUser(user);
            const cart = await CartService.getCart(user);
            const data = {
                user: user,
                addresses: addresses,
                cart: cart,
                page: {
                    categories: []
                }
            };
            return data;
        } catch (error) {
            console.error('Erro ao obter tela de checkout:', error);
            throw Error('Erro ao obter tela de checkout.');
        }
    }

    static async processCheckout(user, addressId, creditCardData, paymentMethod, cart) {
        const client = await pool.connect();
        try {
            const addressSelected = await AddressService.getAddressById(user, addressId);
            if (!addressSelected) {
                throw new Error('Endereço não encontrado.');
            }
            const cartOk = await CartService.areCartsEqual(user, cart);
            if (!cartOk) {
                throw new Error('Carrinho recebido difere do salvo no banco de dados.');
            }
            await client.query('BEGIN');
            const order = await this.createOrder(client, user, addressSelected, cart);
            const payment = await PaymentService.createNewPayment(client, user, paymentMethod, creditCardData, order);
            order.payment = payment;
            await client.query('COMMIT');
            return order;
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Erro ao processar checkout: ', error);
            throw error;
        }
        finally {
            client.release();
        }
    }

    static async createOrder(client, user, addressSelected, cart) {
        try {
            const order = await OrderRepository.createOrder(client, user.id, addressSelected.id, cart.total_amount);
            for (const item of cart?.items) {
                const ok = await ProductService.checkProductStock(item.id, item.quantity);
                if (!ok) {
                    throw new Error('Produto não tem estoque suficiente.');
                }
                await ProductService.reserveProductStock(client, item.product_variant_id, item.quantity);
            }
            const orderItems = await OrderRepository.addOrderItems(client, order.id, cart.items);
            order.items = orderItems;
            return order;
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            throw Error('Erro ao criar pedido.');
        }
    }

    static async getOrdersByUser(user) {
        try {
            const orders = await OrderRepository.getOrdersByUser(user.id);
            return orders;
        } catch (error) {
            console.error('Erro ao obter pedidos:', error);
            throw Error('Erro ao obter pedidos.');
        }
    }

    static async getOrderDetails(user, orderId) {
        try {
            const order = await OrderRepository.getOrderById(user.id, orderId);
            if (!order) {
                throw new Error('Pedido não encontrado.');
            }
            const address = await AddressService.getAddressById(user, order.address_id);
            const orderItems = await OrderRepository.getOrderItems(orderId);
            order.items = orderItems;
            order.address = address;
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

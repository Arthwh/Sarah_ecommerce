import pool from '../db.js';
import { Order, OrderItem, Payment } from '../models/orderModel.js'

class OrderRepository {
    static async createOrder(userId, addressId, paymentId, totalPrice, status) {
        try {
            const query = `
            INSERT INTO orders (user_id, address_id, payment_id, total_price, status)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;
            const values = [userId, addressId, paymentId, totalPrice, status];
            const { rows } = await pool.query(query, values);
            return Order.mapFromRow(rows[0]);
        } catch (error) {
            console.error(`Error creating order: ${error}`);
            throw Error(`Error creating order": ${error.message}`)
        }
    }

    static async addOrderItems(orderId, items) {
        try {
            const query = `
            INSERT INTO order_items (order_id, product_variant_id, quantity, unit_price)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `;
            const promises = items.map(item => {
                const values = [orderId, item.product_variant_id, item.quantity, item.unit_price];
                return pool.query(query, values);
            });
            const results = await Promise.all(promises);
            return results.map(result => OrderItem.mapFromRow(result.rows[0]));
        } catch (error) {
            console.error(`Error adding order items: ${error}`);
            throw Error(`Error adding order items": ${error.message}`)
        }
    }

    static async getOrdersByUser(userId) {
        try {
            const { rows } = await pool.query(`
            SELECT
                o.id AS order_id, 
                o.public_id AS order_public_id,
                o.total_price AS order_total_price,
                o.status AS order_status,
				o.created_at,
				p.status,
                COUNT(oi.order_id) AS order_total_products
            FROM orders o
                INNER JOIN order_items oi ON o.id = oi.order_id
				INNER JOIN payments p ON p.order_id = o.id
            WHERE o.user_id = $1
            GROUP BY oi.order_id, o.id, p.status
            ORDER BY o.created_at DESC;
        `, [userId]);
            return rows;
        } catch (error) {
            console.error(`Error getting orders by user: ${error}`);
            throw Error(`Error getting orders by user": ${error.message}`)
        }
    }

    static async getOrderById(orderId) {
        try {
            const query = `
            SELECT * FROM orders WHERE id = $1;
        `;
            const { rows } = await pool.query(query, [orderId]);
            return rows.length ? Order.mapFromRow(rows[0]) : null;
        } catch (error) {
            console.error(`Error getting orders by ID: ${error}`);
            throw Error(`Error getting orders by ID": ${error.message}`)
        }
    }

    static async getOrderItems(orderId) {
        try {
            const query = `
            SELECT * FROM order_items WHERE order_id = $1;
        `;
            const { rows } = await pool.query(query, [orderId]);
            return rows.map(row => OrderItem.mapFromRow(row));
        } catch (error) {
            console.error(`Error getting order items: ${error}`);
            throw Error(`Error getting orders items": ${error.message}`)
        }
    }

    static async getUserOpenOrders(userId) {
        try {
            const query = `
            SELECT * FROM orders
            WHERE user_id = $1 AND status NOT IN ('delivered', 'cancelled')
            ORDER BY created_at DESC;
        `;
            const { rows } = await pool.query(query, [userId]);
            return rows.map(row => Order.mapFromRow(row));
        } catch (error) {
            console.error(`Error getting orders by user: ${error}`);
            throw Error(`Error getting orders by user": ${error.message}`)
        }
    }

    static async getUserFinishedOrders(userId) {
        try {
            const query = `
            SELECT * FROM orders
            WHERE user_id = $1 AND status = 'delivered'
            ORDER BY created_at DESC;
        `;
            const { rows } = await pool.query(query, [userId]);
            return rows.map(row => Order.mapFromRow(row));
        } catch (error) {
            console.error(`Error getting orders by user: ${error}`);
            throw Error(`Error getting orders by user": ${error.message}`)
        }
    }

    static async getOpenOrders() {
        try {
            const query = `
            SELECT * FROM orders
            WHERE status NOT IN ('delivered', 'cancelled')
            ORDER BY created_at DESC;
        `;
            const { rows } = await pool.query(query);
            return rows.map(row => Order.mapFromRow(row));
        } catch (error) {
            console.error(`Error getting orders by user: ${error}`);
            throw Error(`Error getting orders by user": ${error.message}`)
        }
    }

    static async getFinishedOrders() {
        try {
            const query = `
            SELECT * FROM orders
            WHERE status = 'delivered'
            ORDER BY created_at DESC;
        `;
            const { rows } = await pool.query(query);
            return rows.map(row => Order.mapFromRow(row));
        } catch (error) {
            console.error(`Error getting orders by user: ${error}`);
            throw Error(`Error getting orders by user": ${error.message}`)
        }
    }

    static async getAllOrders() {
        try {
            const query = `
            SELECT * FROM orders ORDER BY created_at DESC;
        `;
            const { rows } = await pool.query(query);
            return rows.map(row => Order.mapFromRow(row));
        } catch (error) {
            console.error(`Error getting orders by user: ${error}`);
            throw Error(`Error getting orders by user": ${error.message}`)
        }
    }

    static async getPaymentByOrderId(orderId) {
        try {
            const query = `
            SELECT p.* FROM payments p
            JOIN orders o ON p.id = o.payment_id
            WHERE o.id = $1;
        `;
            const { rows } = await pool.query(query, [orderId]);
            return rows.length ? Payment.mapFromRow(rows[0]) : null;
        } catch (error) {
            console.error(`Error getting order payment: ${error}`);
            throw Error(`Error getting orders payment": ${error.message}`)
        }
    }
}

export default OrderRepository;
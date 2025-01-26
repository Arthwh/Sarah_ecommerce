import pool from '../db.js';
import { Order } from '../models/orderModel.js'

class OrderRepository {
    static async createOrder(client, userId, addressId, total_amount) {
        try {
            const { rows } = await client.query(`
                INSERT INTO orders (user_id, address_id, total_price)
                VALUES ($1, $2, $3) RETURNING *;
            `, [userId, addressId, total_amount]);
            return rows[0];
        } catch (error) {
            console.error(`Error creating order: ${error}`);
            throw Error(`Error creating order": ${error.message}`)
        }
    }

    static async addOrderItems(client, orderId, items) {
        try {
            const queryBase = `
                INSERT INTO order_items (order_id, product_variant_id, quantity, unit_price)
                VALUES
            `;
            const placeholders = items
                .map((_, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`)
                .join(', ');
            const query = `${queryBase} ${placeholders} RETURNING *;`;
            const values = items.flatMap(item => [
                orderId,
                item.product_variant_id,
                item.quantity,
                parseFloat(item.is_on_sale ? item.variant_offer_value : item.unit_price)
            ]);
            const { rows } = await client.query(query, values);

            return rows;
        } catch (error) {
            console.error(`Error adding order items: ${error}`);
            throw Error(`Error adding order items: ${error.message}`);
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
            WHERE o.user_id = $1 AND o.is_active = true
            GROUP BY oi.order_id, o.id, p.status
            ORDER BY o.created_at DESC;
        `, [userId]);
            return rows;
        } catch (error) {
            console.error(`Error getting orders by user: ${error}`);
            throw Error(`Error getting orders by user": ${error.message}`)
        }
    }

    static async getOrderById(userId, orderId) {
        try {
            const { rows } = await pool.query(`
            SELECT
                o.public_id AS order_public_id, 
                o.total_price AS order_total_amount,
                o.status AS order_status,
                o.created_at,
                p.payment_method,
                p.amount AS payment_amount,
                p.status AS payment_status,
                p.installments AS payment_installments,
                p.installments_value AS payment_installments_value,
                p.transaction_id AS payment_transaction_id,
                a.id AS address_id
            FROM orders o
                INNER JOIN payments p ON p.order_id = o.id
                INNER JOIN addresses a ON a.id = o.address_id
            WHERE o.id = $1 AND o.user_id = $2;
        `, [orderId, userId]);
            return rows[0];
        } catch (error) {
            console.error(`Error getting orders by ID: ${error}`);
            throw Error(`Error getting orders by ID": ${error.message}`)
        }
    }

    static async getOrderItems(orderId) {
        try {
            const { rows } = await pool.query(`
            SELECT 
                p.name AS product_name,
                pv.public_id AS variant_public_id,
                p.public_id AS product_public_id,
                pv.size,
                pv.color,
                pv.installments,
                pv.unit_price,
                pv.unit_price * oi.quantity AS total_price,
                pv.is_on_sale,
                oi.quantity,
                (
                    SELECT image_url 
                    FROM product_variant_images pvi
                    JOIN product_variant_images_assignments pvia 
                    ON pvi.id = pvia.product_variant_images_id
                    WHERE pvia.product_variant_id = pv.id
                    LIMIT 1
                ) AS primary_image
            FROM order_items oi
            INNER JOIN product_variant pv ON oi.product_variant_id = pv.id
            INNER JOIN products p ON pv.products_id = p.id
            WHERE oi.order_id = $1
            ORDER BY oi.quantity ASC
        `, [orderId]);
            return rows;
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
}

export default OrderRepository;
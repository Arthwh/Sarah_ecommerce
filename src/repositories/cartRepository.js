import pool from '../db.js';

class CartRepository {
    static async getCartItems(userId) {
        try {
            const { rows } = await pool.query(`
                SELECT 
                    sci.id AS cart_item_id,
                    sci.product_id,
                    pv.id AS product_variant_id,
                    p.name AS product_name,
                    pv.color,
                    pv.size,
                    pv.unit_price,
                    pv.installments,
                    pv.is_on_sale,
                    pv.unit_price * sci.quantity AS total_price,
                    sci.quantity,
                    (
                        SELECT image_url 
                        FROM product_variant_images pvi
                        JOIN product_variant_images_assignments pvia 
                        ON pvi.id = pvia.product_variant_images_id
                        WHERE pvia.product_variant_id = pv.id AND pvi.is_primary = TRUE
                        LIMIT 1
                    ) AS primary_image
                FROM shopping_cart_items sci
                JOIN shopping_carts sc ON sci.shopping_cart_id = sc.id
                JOIN product_variant pv ON sci.product_id = pv.id
                JOIN products p ON pv.products_id = p.id
                WHERE sc.user_id = $1
            `, [userId]);
            return rows;
        } catch (error) {
            console.error('Error fetching cart items: ', error);
            throw Error('Error fetching cart items', error);
        }
    }


    static async addCartItem(userId, productVariantId, quantity) {
        try {
            const { rows: cartRows } = await pool.query(`
                SELECT id FROM shopping_carts WHERE user_id = $1
            `, [userId]);

            let cartId = cartRows[0]?.id;

            if (!cartId) {
                const { rows: newCartRows } = await pool.query(`
                    INSERT INTO shopping_carts (user_id) 
                    VALUES ($1) RETURNING id
                `, [userId]);
                cartId = newCartRows[0].id;
            }

            const { rows: itemRows } = await pool.query(`
                SELECT id, quantity FROM shopping_cart_items 
                WHERE shopping_cart_id = $1 AND product_id = $2
            `, [cartId, productVariantId]);

            if (itemRows.length > 0) {
                await pool.query(`
                    UPDATE shopping_cart_items 
                    SET quantity = quantity + $1, updated_at = CURRENT_TIMESTAMP
                    WHERE id = $2
                `, [quantity, itemRows[0].id]);
            } else {
                await pool.query(`
                    INSERT INTO shopping_cart_items (shopping_cart_id, product_id, quantity) 
                    VALUES ($1, $2, $3)
                `, [cartId, productVariantId, quantity]);
            }
        } catch (error) {
            console.error('Error adding to cart: ', error);
            throw Error('Error adding to cart', error);
        }
    }


    static async removeCartItem(userId, productVariantId) {
        try {
            await pool.query(`
                DELETE FROM shopping_cart_items 
                USING shopping_carts
                WHERE shopping_cart_items.shopping_cart_id = shopping_carts.id 
                AND shopping_carts.user_id = $1
                AND shopping_cart_items.product_id = $2
            `, [userId, productVariantId]);
        } catch (error) {
            console.error('Error removing from cart: ', error);
            throw Error('Error removing from cart', error);
        }
    }

}

export default CartRepository;

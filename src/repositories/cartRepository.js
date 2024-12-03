import pool from '../db.js';

class CartRepository {
    static async getCartItems(userId) {
        try {
            const { rows } = await pool.query(`
                SELECT
					sci.id AS cart_item_id,
                    sci.product_variant_id,
                    p.name AS product_name,
                    p.public_id AS product_public_id,
                    pv.public_id AS variant_public_id,
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
                        WHERE pvia.product_variant_id = pv.id
                        LIMIT 1
                    ) AS primary_image,
					variant_offers.offer_type AS variant_offer_type,
                    variant_offers.offer_value AS variant_offer_value,
                    variant_offers.offer_installments AS variant_offer_installments
                FROM shopping_cart_items sci
                INNER JOIN shopping_carts sc ON sci.shopping_cart_id = sc.id
                INNER JOIN product_variant pv ON sci.product_variant_id = pv.id
                INNER JOIN products p ON pv.products_id = p.id
				-- Aplica DISTINCT ON para pegar a primeira linha da tabela de ofertas por variante
                LEFT JOIN (
                    SELECT DISTINCT ON (pvo.product_variant_id) pvo.offer_type, pvo.offer_value, pvo.offer_installments, pvo.product_variant_id
                    FROM product_variant pv
                    INNER JOIN product_variant_offers pvo ON pv.id = pvo.product_variant_id
                    WHERE pvo.is_active = true
                    ORDER BY pvo.product_variant_id DESC
                ) variant_offers ON variant_offers.product_variant_id = pv.id
                WHERE sc.user_id = $1
                ORDER BY sci.created_at ASC
            `, [userId]);
            return rows;
        } catch (error) {
            console.error('Error fetching cart items: ', error);
            throw Error('Error fetching cart items', error);
        }
    }

    static async getUserCartCount(userId) {
        try {
            const { rows } = await pool.query(`
                    SELECT 
                        COALESCE(SUM(sci.quantity), 0) AS cart_count
                    FROM shopping_cart_items sci INNER JOIN shopping_carts sc ON sc.id = sci.shopping_cart_id
                    WHERE sc.user_id = $1
                `, [userId]);
            const cartQuantity = rows[0]?.cart_count;
            return cartQuantity;
        } catch (error) {
            console.error('Error fetching cart count: ', error);
            throw Error('Error fetching cart count', error);
        }
    }

    static async addCartItem(userShoppingCartId, variantId, quantity) {
        try {
            await pool.query(`
                INSERT INTO shopping_cart_items (shopping_cart_id, product_variant_id, quantity) 
                VALUES ($1, $2, $3)
            `, [userShoppingCartId, variantId, quantity]);
        } catch (error) {
            console.error('Error adding to cart: ', error);
            throw Error('Error adding to cart', error);
        }
    }

    static async updateCartItem(userShoppingCartId, variantId, quantity) {
        try {
            await pool.query(`
                    UPDATE shopping_cart_items
                    SET quantity = $1
                    WHERE shopping_cart_id = $2 AND product_variant_id = $3
                `, [quantity, userShoppingCartId, variantId]);
        } catch (error) {
            console.error('Error updating item from cart: ', error);
            throw Error('Error updating item from cart: ', error);
        }
    }

    static async removeCartItem(userShoppingCartId, variantId) {
        try {
            await pool.query(`
                DELETE FROM shopping_cart_items 
                WHERE shopping_cart_id = $1 AND product_variant_id = $2
            `, [userShoppingCartId, variantId]);
        } catch (error) {
            console.error('Error removing from cart: ', error);
            throw Error('Error removing from cart', error);
        }
    }

    static async getVariantQuantityFromUserCart(shoppingCartId, productSku) {
        try {
            const { rows } = await pool.query(`
                SELECT 
                    sci.id, sci.quantity 
                FROM shopping_cart_items sci INNER JOIN product_variant pv ON pv.id = product_variant_id
                WHERE sci.shopping_cart_id = $1 AND pv.public_id = $2
            `, [shoppingCartId, productSku]);

            return rows[0];
        } catch (error) {
            console.error('Error getting variant quantity from user cart: ', error);
            throw Error('Error getting variant quantity from user cart', error);
        }
    }

    static async getUserShoppingCartId(userId) {
        try {
            const { rows } = await pool.query(`
                    SELECT id 
                    FROM shopping_carts 
                    WHERE user_id = $1
                `, [userId]);
            return rows[0].id;
        } catch (error) {
            console.error('Error getting user cart id: ', error);
            throw Error('Error getting user cart id:', error);
        }
    }

    static async createUserShoppingCart(userId) {
        try {
            const { rows } = await pool.query(`
                INSERT INTO shopping_carts (user_id) 
                VALUES ($1) RETURNING id
            `, [userId]);
            return rows[0].id;
        } catch (error) {
            console.error('Error creating user cart: ', error);
            throw Error('Error creating user cart:', error);
        }
    }

    static async clearCart(shoppingCartId) {
        try {
            await pool.query(`
                    DELETE FROM shopping_cart_items 
                    WHERE shopping_cart_id = $1
                `, [shoppingCartId]);
        } catch (error) {
            console.error('Error clearing cart: ', error);
            throw Error('Error clearing cart:', error);
        }
    }
}

export default CartRepository;

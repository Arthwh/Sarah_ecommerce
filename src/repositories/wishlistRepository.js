import pool from '../db.js'

class WishlistRepository {
    static async createNewWishlist(userId) {
        try {
            await pool.query(`
                    INSERT INTO favorites_list (user_id) VALUES ($1)
                `, [userId]);
        } catch (error) {
            console.error('Error while creating new wishlist: ', error);
            throw Error('Error while creating new wishlist: ', error.message);
        }
    }

    static async getCountWishlistProductsByUserId(userId) {
        try {
            const { rows } = await pool.query(`
                    SELECT COUNT(DISTINCT fi.product_id)
                    FROM favorites_list fl INNER JOIN favorites_items fi ON fl.id = fi.favorites_list_id
                    WHERE fl.user_id = $1
                `, [userId]);

            return rows[0].count || 0;
        } catch (error) {
            console.error('Error while getting count wishlist products by user id: ', error);
            throw Error(`Error while getting count wishlist products by user id: ${error.message}`);
        }
    }

    static async fetchWishlistItemsByUserId_resumedForm(userId) {
        try {
            const { rows } = await pool.query(`
                    SELECT 
                        fl.id AS wishlist_id,
                        fi.product_id,
                        p.public_id AS product_public_id
                    FROM 
                        favorites_list fl INNER JOIN favorites_items fi ON fl.id = fi.favorites_list_id
                        INNER JOIN products p ON fi.product_id = p.id
                    WHERE fl.user_id = $1
                    ORDER BY fi.created_at
                `, [userId]);

            return rows;
        } catch (error) {
            console.error('Error while fetching wishlist items: ', error);
            throw Error('Error while fetching wishlist items: ', error.message);
        }
    }

    static async fetchWishlistItemsByUserId_completeForm(userId, limit, offset) {
        try {
            const { rows } = await pool.query(`
                        SELECT
                            p.public_id AS product_public_id,
                            p.name AS product_name,
                            p.total_stock_quantity,
                            pv.public_id AS variant_public_id,
                            pv.unit_price AS variant_unit_price,
                            pv.installments AS variant_installments,
                            pv.is_on_sale AS variant_is_on_sale,
                            pv.stock_quantity AS variant_stock_quantity,
                            array_agg(DISTINCT pvi.image_url) AS variant_images,
                            variant_offers.offer_type AS variant_offer_type,
                            variant_offers.offer_value AS variant_offer_value,
                            variant_offers.offer_installments AS variant_offer_installments,
                            COALESCE(AVG(pr.rating), 0) AS product_review_score,
                            COUNT(DISTINCT pr.*) AS product_review_quantity,
                            CASE WHEN fi.product_id IS NOT NULL THEN TRUE ELSE FALSE END AS product_in_wishlist
                        FROM products p
                        INNER JOIN (
                            SELECT DISTINCT ON (p.id) 
                                pv.public_id,
                                pv.unit_price,
                                pv.installments,
                                pv.is_on_sale,
                                pv.stock_quantity,
                                pv.id,
                                p.id AS product_id
                            FROM product_variant pv
                            INNER JOIN products p ON p.id = pv.products_id
                            ORDER BY p.id, pv.stock_quantity DESC
                        ) pv ON pv.product_id = p.id
                        INNER JOIN product_variant_images_assignments pvia ON pv.id = pvia.product_variant_id
                        INNER JOIN product_variant_images pvi ON pvia.product_variant_images_id = pvi.id
                        -- Aplica DISTINCT ON para pegar a primeira linha da tabela de ofertas por variante
                        LEFT JOIN (
                            SELECT DISTINCT ON (pvo.product_variant_id) pvo.offer_type, pvo.offer_value, pvo.offer_installments, pvo.product_variant_id
                            FROM product_variant_offers pvo
                            WHERE pvo.is_active = true
                            ORDER BY pvo.product_variant_id DESC
                        ) variant_offers ON variant_offers.product_variant_id = pv.id
                        LEFT JOIN product_reviews pr ON p.id = pr.product_id
                        INNER JOIN favorites_items fi ON fi.product_id = p.id
                        INNER JOIN favorites_list fl ON fi.favorites_list_id = fl.id
                        WHERE fl.user_id = $1
                        GROUP BY
                            p.id,
                            pv.id,
                            pv.public_id,
                            pv.unit_price,
                            pv.installments,
                            pv.is_on_sale,
                            pv.stock_quantity,
                            variant_offers.offer_type,
                            variant_offers.offer_value,
                            variant_offers.offer_installments,
                            fi.product_id
                        LIMIT $2 
                        OFFSET $3
            `, [userId, limit, offset]);
            return rows;
        } catch (error) {
            console.error('Error while fetching wishlist items: ', error);
            throw Error('Error while fetching wishlist items: ', error.message);
        }
    }

    static async checkProductIsAddedWishlist(userId, productPublicId) {
        try {
            const { rows } = await pool.query(`
                    SELECT * 
                    FROM favorites_list fl INNER JOIN favorites_items fi ON fi.favorites_list_id = fl.id
                    INNER JOIN products p ON p.id = fi.product_id
                    WHERE fl.user_id = $1 AND p.public_id = $2
                `, [userId, productPublicId]);

            return rows.length > 0;
        } catch (error) {
            console.error('Error while checking product is added wishlist: ', error);
            throw Error('Error while checking product is added wishlist: ', error.message);
        }
    }

    static async removeProductFromWishlist(userId, productPublicId) {
        try {
            await pool.query(`
                    DELETE FROM favorites_items
                    USING favorites_list, products
                    WHERE favorites_items.favorites_list_id = favorites_list.id
                    AND favorites_items.product_id = products.id
                    AND favorites_list.user_id = $1
                    AND products.public_id = $2;
                `, [userId, productPublicId]);
        } catch (error) {
            console.error('Error while removing product from wishlist: ', error);
        }
    }

    static async addProductToWishlist(userId, productPublicId) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const { rows: favoritesRows } = await client.query(
                `SELECT id AS favorites_list_id FROM favorites_list WHERE user_id = $1 LIMIT 1`,
                [userId]
            );
            if (favoritesRows.length === 0) {
                throw new Error(`Favorites list not found for user ID ${userId}`);
            }
            const favoritesListId = favoritesRows[0].favorites_list_id;

            const { rows: productRows } = await client.query(
                `SELECT id AS product_id FROM products WHERE public_id = $1 LIMIT 1`,
                [productPublicId]
            );
            if (productRows.length === 0) {
                throw new Error(`Product not found for public ID ${productPublicId}`);
            }
            const productId = productRows[0].product_id;

            await client.query(
                `INSERT INTO favorites_items (favorites_list_id, product_id) VALUES ($1, $2)`,
                [favoritesListId, productId]
            );

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error while adding product to wishlist: ', error);
            throw Error('Error while adding product to wishlist: ', error.message)
        } finally {
            client.release();
        }
    }
}

export default WishlistRepository;
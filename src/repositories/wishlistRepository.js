import pool from '../db.js'

class WishlistRepository {
    static async createNewWishlist(userId) {
        try {
            await pool.query(`
                    INSERT INTO favorites_list (user_id) VALUES $1
                `, [userId]);
        } catch (error) {
            console.error('Error while creating new wishlist: ', error);
            throw Error('Error while creating new wishlist: ', error.message);
        }
    }

    static async fetchWishlistItemsByUserId(userId) {
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
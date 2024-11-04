import pool from '../db.js';
import { ProductVariant } from '../models/productVariantModel.js'

class ProductVariantRepository {
    static async getAllProductVariantsRepository() {
        try {
            const { rows } = await pool.query('SELECT * FROM product_variant');
            return rows.map(row => new ProductVariant(row));
        } catch (error) {
            console.error('Error finding all product variants:', error);
            throw error;
        }
    }

    static async getProductVariantByIdRepository(id) {
        try {
            const { rows } = await pool.query('SELECT * FROM product_variant WHERE id = $1', [id]);
            return new ProductVariant(rows[0]);
        } catch (error) {
            console.error('Error finding product variant by id:', error);
            throw error;
        }
    }

    static async createProductVariantRepository({ product_id, color, unit_price, installments, is_on_sale, size, stock_quantity }) {
        try {
            const { rows } = await pool.query(
                "INSERT INTO product_variant (product_id, color, unit_price, installments, is_on_sale, size, stock_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                [product_id, color, unit_price, installments, is_on_sale, size, stock_quantity]
            );
            return rows[0];
        } catch (error) {
            console.error('Error creating product variant:', error);
            throw error;
        }
    }

    static async updateProductVariantRepository(id, { product_id, color, unit_price, installments, is_on_sale, size, stock_quantity }) {
        try {
            const { rows } = await pool.query(
                'UPDATE product_variant SET product_id = $1, color = $2, unit_price = $3, installments = $4, is_on_sale = $5, size = $6, stock_quantity = $7 RETURNING *',
                [product_id, color, unit_price, installments, is_on_sale, size, stock_quantity]
            );
            return rows[0];
        } catch (error) {
            console.error('Error updating product variant:', error);
            throw error;
        }
    }

    static async deleteProductVariantRepository(id) {
        try {
            const { rows } = await pool.query('DELETE FROM product_variant WHERE id = $1 RETURNING *', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error deleting product variant:', error);
            throw error;
        }
    }
}
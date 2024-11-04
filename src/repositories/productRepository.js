import pool from '../db.js';
import { Product } from '../models/productModel.js'

class ProductRepository {
    static async listProductsRepository() {
        try {
            const { rows } = await pool.query('SELECT * FROM products');
            return rows.map(row => new Product(row));
        } catch (error) {
            console.error('Error finding all products:', error);
            throw error;
        }
    }

    static async getProductByIdRepository(id) {
        try {
            const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
            return new Product(rows[0]);
        } catch (error) {
            console.error('Error finding product by id:', error);
            throw error;
        }
    }

    static async createProductRepository({ brand_id, name, description, total_stock_quantity }) {
        try {
            const { rows } = await pool.query(
                "INSERT INTO products (brand_id, name, description, total_stock_quantity) VALUES ($1, $2, $3, $4) RETURNING *",
                [brand_id, name, description, total_stock_quantity]
            );
            return rows[0];
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }

    static async updateProductRepository(id, { brand_id, name, description, total_stock_quantity }) {
        try {
            const { rows } = await pool.query(
                'UPDATE products SET brand_id = $1, name = $2, description = $3, total_stock_quantity = $4 RETURNING *',
                [brand_id, name, description, total_stock_quantity]
            );
            return rows[0];
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }

    static async deleteProductRepository(id) {
        try {
            const { rows } = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }

    static async updateProductVariantRepository(sku) {

        return rows[0];
    }

    static async getLandingPageDataRepository() {
        const { rows } = await pool.query('SELECT id, section_name, section_model, section_content, content_type, section_position, start_date, end_date, is_active FROM landing_page_components WHERE is_active = true ORDER BY section_position ASC;');
        return rows
    }
}

export default ProductRepository
import pool from '../db.js';

class ProductRepository {
    static async getAllProductsRepository() {
        const { rows } = await pool.query('SELECT * FROM products');
        return rows;
    }

    static async getProductByIdRepository(id) {
        const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        return rows[0];
    }

    static async createProductRepository({ name, description, total_stock_quantity, brand_id, category_id, subcategory_id, variant_unit_price, color, size, image_url }) {
        const { rows } = await pool.query('INSERT INTO PRODUCTS (name, description, total_stock_quantity, brand_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, total_stock_quantity, brand_id]
        );
        return rows[0];
    }

    static async updateProductRepository(id, { brand_id, name, description, unit_price, total_stock_quantity, created_at, updated_at, is_active }) {
        const { rows } = await pool.query(
            'UPDATE products SET brand_id = $1, name = $2, description = $3, unit_price = $4, total_stock_quantity = $5, created_at = $6, updated_at = $7, is_active = $8 WHERE id = $9 RETURNING *',
            [brand_id, name, description, unit_price, total_stock_quantity, created_at, updated_at, is_active, id]
        );
        return rows[0];
    }

    static async deleteProductRepository(id) {
        const { rows } = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        return rows[0];
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
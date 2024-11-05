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

    static async createProductRepository({
        productName,
        productDescription,
        brand
    }) {
        try {
            // Quantidade em estoque temporária
            const { rows } = await pool.query(`
                INSERT INTO products (brand_id, name, description, total_stock_quantity)
                VALUES ($1, $2, $3, 1337) RETURNING id
            `, [brand, productName, productDescription]);
            return rows[0];
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }

    static async assignSubcategoryRepository(product_id, { subcategory }) {
        try {
            const { rows } = await pool.query(`
                INSERT INTO product_subcategory_assignments(product_id, sub_category_id)
                VALUES($1, $2)
                    `, [product_id, subcategory[0]]);
            return rows[0];
        } catch (error) {
            console.error('Error assigning category:', error);
            throw error;
        }
    }

    static async updateProductRepository(id, { brand_id, name, description, total_stock_quantity }) {
        try {
            const { rows } = await pool.query(
                'UPDATE products SET brand_id = $1, name = $2, description = $3, total_stock_quantity = $4 WHERE ID = $5 RETURNING *',
                [brand_id, name, description, total_stock_quantity, id]
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
        try {
            const { rows } = await pool.query('');
            return rows;
        } catch (error) {
            console.error('Error finding all products:', error);
            throw error;
        }
    }

    static async getCategoriesAndSubcategories() {
        try {
            const { rows } = await pool.query('SELECT c.id AS category_id, c.name AS category_name, s.id AS subcategory_id, s.name AS subcategory_name FROM categories c LEFT JOIN sub_categories s ON c.id = s.categories_id ORDER BY c.id, s.id;');
            return rows;
        } catch (error) {
            console.error('Error getting categories and subcategories: ', error);
            throw error;
        }
    }
}

export default ProductRepository
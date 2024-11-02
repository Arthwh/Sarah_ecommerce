export class Product {
    constructor({ id, publicId, name, description, total_stock_quantity }) {
        this.id = id;
        this.publicId = publicId;
        this.name = name;
        this.description = description;
        this.total_stock_quantity = total_stock_quantity;
    }

    static async getLandingPageComponents(){
        
    }
}

// Método para validar dados do produto
export function validate(userData) {
    const { publicId, name, description, total_stock_quantity } = userData;
    if (!publicId || !name || !description || !total_stock_quantity ) {
        return false
    }
    return true
}

// import pool from '../db.js';

// class ProductModel {
//     static async getAllProducts() {
//         const { rows } = await pool.query('SELECT * FROM products');
//         return rows;
//     }

//     static async getProductById(id) {
//         const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
//         return rows[0];
//     }

//     static async createProduct({ brand_id, name, description, unit_price, total_stock_quantity, created_at, updated_at, is_active }) {
//         const { rows } = await pool.query(
//             'INSERT INTO products (brand_id, name, description, unit_price, total_stock_quantity, created_at, updated_at, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
//             [brand_id, name, description, unit_price, total_stock_quantity, created_at, updated_at, is_active]
//         );
//         return rows[0];
//     }

//     static async updateProduct(id, { brand_id, name, description, unit_price, total_stock_quantity, created_at, updated_at, is_active }) {
//         const { rows } = await pool.query(
//             'UPDATE products SET brand_id = $1, name = $2, description = $3, unit_price = $4, total_stock_quantity = $5, created_at = $6, updated_at = $7, is_active = $8 WHERE id = $9 RETURNING *',
//             [brand_id, name, description, unit_price, total_stock_quantity, created_at, updated_at, is_active, id]
//         );
//         return rows[0];
//     }

//     static async deleteProduct(id) {
//         const { rows } = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
//         return rows[0];
//     }

//     static async updateProductVariant(sku) {

//         return rows[0];
//     }

//     static async getLandingPageData() {
//         const { rows } = await pool.query('SELECT id, section_name, section_model, section_content, content_type, section_position, start_date, end_date, is_active FROM landing_page_components WHERE is_active = true ORDER BY section_position ASC;');
//         return rows
//     }
// }

// export default ProductModel;
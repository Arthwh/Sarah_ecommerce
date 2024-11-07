import { compareSync } from 'bcrypt';
import pool from '../db.js';
import { ProductVariant } from '../models/productVariantModel.js'

class ProductVariantRepository {
    // static async getAllProductVariantsRepository(orderby, limit) {
    //     try {
    //         const query = `
    //             SELECT 
    //             pv.id AS id,
    //             pv.unit_price AS price,
    //             pv.is_on_sale AS variant_is_on_sale,
    //             pva.image_url AS variant_image_url,
    //             p.id AS product_id,
    //             p.name AS product_name
    //             FROM 
    //                 product_variant pv
    //             LEFT JOIN 
    //                 product_variant_images pva ON pv.id = pva.product_variant_id
    //             JOIN 
    //                 products p ON pv.products_id = p.id
    //             WHERE 
    //             pv.products_id IS NOT NULL
    //             LIMIT '${limit}';
    //         `
    //         const { rows } = await pool.query(query);
    //         // return rows.map(row => new ProductVariant(row));
    //         return rows;
    //     } catch (error) {
    //         console.error('Error finding all product variants:', error);
    //         throw error;
    //     }
    // }

    static async getProductVariantByIdRepository(id) {
        try {
            const { rows } = await pool.query('SELECT * FROM product_variant WHERE id = $1', [id]);
            return new ProductVariant(rows[0]);
        } catch (error) {
            console.error('Error finding product variant by id:', error);
            throw error;
        }
    }

    static async getProductVariantsByProductIdRepository(id) {
        try {
            const { rows } = await pool.query('SELECT * FROM product_variant WHERE products_id = $1', [id]);
            return rows;
        } catch (error) {
            console.error('Error finding all product variant by product id:', error);
            throw error;
        }
    }

    //FUNCIONANDO CERTO
    static async createProductVariantRepository(client, product_id, variants) {
        try {
            variants = JSON.parse(variants);
            const rows = [];
            for (const variant of variants) {
                variant.variantPrice = parseFloat(variant.variantPrice.replace('R$', '').replace(/\./g, '').replace(',', '.'));
                const resultVariant = await client.query(
                    //is_on_sale tem valor default de false
                    "INSERT INTO product_variant (products_id, color, color_code, unit_price, installments, size, is_on_sale, stock_quantity) VALUES ($1, $2, $3, $4, $5, $6, false, $7) RETURNING *",
                    [product_id, variant.variantColor, variant.variantColorCode, variant.variantPrice, variant.variantInstallments, variant.variantSize, variant.variantInitialStock]
                );
                rows.push({ variantId: resultVariant.rows[0].id, variantImage: variant.variantImage });
            }
            return rows;
        } catch (error) {
            console.error('Error creating product variant:', error);
            throw Error('Error creating product variant:', error);
        }
    }

    //FUNCIONANDO CERTO
    static async insertVariantImages(client, files) {
        try {
            const images = [];
            for (const file of files) {
                const filePath = `../public/images/products/${file.originalname}`
                const variantAssignment = file.originalname.split('_')[0];
                const rows = await client.query("INSERT INTO product_variant_images (image_url) VALUES ($1) RETURNING id, image_url", [filePath]);
                const imageId = rows.rows[0].id
                images.push({ imageId: imageId, variantAssignment: variantAssignment });
            }
            return images;
        } catch (error) {
            console.error('Error inserting variant images:', error);
            throw Error('Error inserting variant images:', error);
        }
    }

    //FUNCIONANDO CERTO
    static async assignVariantImageRepository(client, variants, images) {
        try {
            const assignments = [];
            for (const variant of variants) {
                for (const image of images) {
                    if (variant.variantImage == image.variantAssignment) {
                        assignments.push([variant.variantId, image.imageId]);
                    }
                }
            }

            if (assignments.length > 0) {
                const values = assignments.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(', ');
                const flattenedValues = assignments.flat();
                await client.query(`INSERT INTO product_variant_images_assignments (product_variant_id, product_variant_images_id) VALUES ${values}`, flattenedValues);
            }
        } catch (error) {
            console.error('Error assigning variant images:', error);
            throw Error('Error assigning variant images:', error);
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

export default ProductVariantRepository
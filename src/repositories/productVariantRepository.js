import pool from '../db.js';

class ProductVariantRepository {
    static async getAllProductVariantsByProductIdRepository(id) {
        try {
            const { rows } = await pool.query(`
                    SELECT 
						p.public_id AS product_public_id,
						pv.public_id AS variant_public_id,
                        pv.color AS variant_color_name,
                        pv.color_code AS variant_color_code,
                        pv.size AS variant_size,
                        pv.stock_quantity AS variant_stock_quantity
						FROM products p
                        INNER JOIN product_variant pv ON p.id = pv.products_id
					WHERE p.public_id = $1 AND p.is_active = true
					GROUP BY
						p.id,
                        pv.id
                `, [id]);
            return rows;
        } catch (error) {
            console.error('Error finding all product variant by product id:', error);
            throw error;
        }
    }

    static async getVariantDataBySku(sku) {
        try {
            const { rows } = await pool.query(`
                    SELECT 
						p.public_id AS product_public_id,
						p.name AS product_name,
						p.description AS product_description,
						pv.public_id AS variant_public_id,
                        pv.color AS variant_color_name,
                        pv.color_code AS variant_color_code,
                        pv.size AS variant_size,
                        pv.unit_price AS variant_unit_price,
                        pv.stock_quantity AS variant_stock_quantity,
						array_agg(DISTINCT pvi.image_url) AS variant_images,
                        variant_offers.offer_type AS variant_offer_type,
                        variant_offers.offer_value AS variant_offer_value,
                        variant_offers.offer_installments AS variant_offer_installments
						FROM products p
                        INNER JOIN product_variant pv ON p.id = pv.products_id
                        INNER JOIN product_variant_images_assignments pvia ON pv.id = pvia.product_variant_id
                        INNER JOIN product_variant_images pvi ON pvia.product_variant_images_id = pvi.id
						-- Aplica DISTINCT ON para pegar a primeira linha da tabela de ofertas por variante
                        LEFT JOIN (
                            SELECT DISTINCT ON (pvo.product_variant_id) pvo.offer_type, pvo.offer_value, pvo.offer_installments, pvo.product_variant_id
                            FROM product_variant pv
                            INNER JOIN product_variant_offers pvo ON pv.id = pvo.product_variant_id
                            WHERE pvo.is_active = true
                            ORDER BY pvo.product_variant_id DESC
                        ) variant_offers ON variant_offers.product_variant_id = pv.id
					WHERE pv.public_id = $1
					GROUP BY
						p.id,
                        pv.id,
						variant_offers.offer_type,
                        variant_offers.offer_value,
                        variant_offers.offer_installments
                `, [sku]);
            return rows[0];
        } catch (error) {
            console.error('Error finding variant data by sku: ', error);
        }
    }

    static async createProductVariantRepository(client, product_id, variants) {
        try {
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

    static async getVariantIdByPublicId(sku) {
        try {
            const { rows } = await pool.query('SELECT id FROM product_variant WHERE public_id = $1', [sku])
            return rows[0].id
        } catch (error) {
            console.error('Error getting variant id by public id:', error);
            throw error;
        }
    }

    static async reserveStock(client, productVariantId, quantity) {
        try {
            await client.query(`
                    UPDATE product_variant 
                    SET stock_quantity = (stock_quantity - $1), reserved_stock_quantity = (reserved_stock_quantity + $1)
                    WHERE id = $2
                `, [quantity, productVariantId]);
        } catch (error) {
            console.error('Error reserving stock:', error);
            throw error;
        }
    }

    static async getVariantStock(productVariantId) {
        try {
            const { rows } = await pool.query(`
                    SELECT stock_quantity
                    FROM product_variant
                    WHERE id = $1
                `, [productVariantId]);
            return rows[0]?.stock_quantity
        } catch (error) {
            console.error('Error getting variant stock:', error);
            throw error;
        }
    }
}

export default ProductVariantRepository
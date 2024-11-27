import pool from '../db.js';
import { Product } from '../models/productModel.js'

class ProductRepository {
    static async getProductsByFilter_newArrivals(limit = 10) {
        try {
            const { rows } = await pool.query(`
                    SELECT
                        p.public_id AS product_public_id,
                        p.name AS product_name,
                        p.total_stock_quantity AS product_total_stock_quantity,
                        pv.public_id AS variant_public_id,
                        pv.unit_price AS variant_unit_price,
                        pv.installments AS variant_installments,
                        pv.is_on_sale AS variant_is_on_sale,
                        pv.stock_quantity AS variant_stock_quantity,
                        array_agg(DISTINCT pvi.image_url) AS variant_images,
                        vod.offer_type AS variant_offer_type,
                        vod.offer_value AS variant_offer_value,
                        vod.offer_installments AS variant_offer_installments,
                        COALESCE(AVG(pr.rating), 0) AS product_review_score,
	                    COUNT(DISTINCT pr.*) AS product_review_quantity
                    FROM
                        products p
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
                        ) AS vod ON vod.product_variant_id = pv.id
                        -- Aplica DISTINCT ON para pegar a primeira linha por produto e cor
                        LEFT JOIN (
                            SELECT DISTINCT ON (p.id, pv.color) p.id AS product_id, pv.color, pv.id AS variant_id
                            FROM products p
                            INNER JOIN product_variant pv ON p.id = pv.products_id
                            WHERE pv.stock_quantity > 0
                            ORDER BY p.id, pv.color, pv.stock_quantity DESC
                        ) unique_colors ON unique_colors.product_id = p.id AND unique_colors.color = pv.color
                        LEFT JOIN product_reviews pr ON p.id = pr.product_id
                    WHERE unique_colors.variant_id = pv.id
                    GROUP BY
                        p.id,
                        pv.id,
                        vod.offer_type,
                        vod.offer_value,
                        vod.offer_installments
                    ORDER BY p.created_at DESC
                    LIMIT $1
            `, [limit]);
            return rows;
        } catch (error) {
            console.error(`Error while getting products by filter "newArrivals": ${error}`);
            throw Error(`Error while getting products by filter "newArrivals": ${error.message}`)
        }
    }

    static async getProductsByFilter_highestRated(limit = 10) {
        try {
            const { rows } = await pool.query(`
                    WITH product_reviews_data AS (
                        SELECT
                            pr.product_id,
                            COALESCE(AVG(pr.rating), 0) AS review_score,
                            COUNT(*) AS review_count
                        FROM product_reviews pr
                        GROUP BY pr.product_id
                    ),
                    variant_offers_data AS (
                        SELECT DISTINCT ON (pvo.product_variant_id)
                            pvo.product_variant_id,
                            pvo.offer_type,
                            pvo.offer_value,
                            pvo.offer_installments
                        FROM product_variant_offers pvo
                        WHERE pvo.is_active = true
                        ORDER BY pvo.product_variant_id, pvo.created_at DESC
                    )
                    SELECT
                        p.public_id AS product_public_id,
                        p.name AS product_name,
                        p.total_stock_quantity AS product_total_stock_quantity,
                        pv.public_id AS variant_public_id,
                        pv.unit_price AS variant_unit_price,
                        pv.installments AS variant_installments,
                        pv.is_on_sale AS variant_is_on_sale,
                        pv.stock_quantity AS variant_stock_quantity,
                        array_agg(DISTINCT pvi.image_url) AS variant_images,
                        variant_offers_data.offer_type AS variant_offer_type,
                        variant_offers_data.offer_value AS variant_offer_value,
                        variant_offers_data.offer_installments AS variant_offer_installments,
                        COALESCE(product_reviews_data.review_score, 0) AS product_review_score,
                        COALESCE(product_reviews_data.review_count, 0) AS product_review_quantity
                    FROM
                        products p
                        INNER JOIN product_variant pv ON p.id = pv.products_id
                        INNER JOIN product_variant_images_assignments pvia ON pv.id = pvia.product_variant_id
                        INNER JOIN product_variant_images pvi ON pvia.product_variant_images_id = pvi.id
                        LEFT JOIN variant_offers_data ON variant_offers_data.product_variant_id = pv.id
                        LEFT JOIN product_reviews_data ON product_reviews_data.product_id = p.id
                        -- Aplica DISTINCT ON para pegar a primeira linha por produto e cor
                        LEFT JOIN (
                            SELECT DISTINCT ON (p.id, pv.color) p.id AS product_id, pv.color, pv.id AS variant_id
                            FROM products p
                            INNER JOIN product_variant pv ON p.id = pv.products_id
                            WHERE pv.stock_quantity > 0
                            ORDER BY p.id, pv.color, pv.stock_quantity DESC
                        ) unique_colors ON unique_colors.product_id = p.id AND unique_colors.color = pv.color
                    WHERE pv.stock_quantity > 0 AND unique_colors.variant_id = pv.id
                    GROUP BY
                        p.id,
                        pv.id,
                        variant_offers_data.offer_type,
                        variant_offers_data.offer_value,
                        variant_offers_data.offer_installments,
                        product_reviews_data.review_score,
                        product_reviews_data.review_count
                    ORDER BY COALESCE(product_reviews_data.review_score, 0) DESC
                    LIMIT $1;
            `, [limit]);
            return rows;
        } catch (error) {
            console.error(`Error while getting products by filter "newArrivals": ${error}`);
            throw Error(`Error while getting products by filter "newArrivals": ${error.message}`)
        }
    }

    static async getProductsByFilter_bestSelling(limit = 10) {
        try {
            const { rows } = await pool.query(`
                WITH product_highest_selled AS (
                    SELECT oi.product_id, COUNT(oi.quantity) AS product_sells_quantity
                    FROM order_items oi
                    GROUP BY oi.product_id
                    ORDER BY product_sells_quantity
                )
                SELECT
                    p.public_id AS product_public_id,
                    p.name AS product_name,
                    p.total_stock_quantity AS product_total_stock_quantity,
                    pv.public_id AS variant_public_id,
                    pv.unit_price AS variant_unit_price,
                    pv.installments AS variant_installments,
                    pv.is_on_sale AS variant_is_on_sale,
                    pv.stock_quantity AS variant_stock_quantity,
                    array_agg(DISTINCT pvi.image_url) AS variant_images,
                    vod.offer_type AS variant_offer_type,
                    vod.offer_value AS variant_offer_value,
                    vod.offer_installments AS variant_offer_installments,
                    COALESCE(AVG(pr.rating), 0) AS product_review_score,
                    COUNT(DISTINCT pr.*) AS product_review_quantity,
                    COALESCE(phs.product_sells_quantity, 0) AS product_sells_quantity
                FROM
                    products p
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
                    ) AS vod ON vod.product_variant_id = pv.id
                    -- Aplica DISTINCT ON para pegar a primeira linha por produto e cor
                    LEFT JOIN (
                        SELECT DISTINCT ON (p.id, pv.color) p.id AS product_id, pv.color, pv.id AS variant_id
                        FROM products p
                        INNER JOIN product_variant pv ON p.id = pv.products_id
                        WHERE pv.stock_quantity > 0
                        ORDER BY p.id, pv.color, pv.stock_quantity DESC
                    ) unique_colors ON unique_colors.product_id = p.id AND unique_colors.color = pv.color
                    LEFT JOIN product_reviews pr ON p.id = pr.product_id
                    INNER JOIN product_highest_selled AS phs ON phs.product_id = p.id
                WHERE unique_colors.variant_id = pv.id
                GROUP BY
                    p.id,
                    pv.id,
                    vod.offer_type,
                    vod.offer_value,
                    vod.offer_installments,
                    phs.product_sells_quantity
                ORDER BY phs.product_sells_quantity DESC
                LIMIT $1
    `, [limit]);
            return rows;
        } catch (error) {
            console.error(`Error while getting products by filter "newArrivals": ${error}`);
            throw Error(`Error while getting products by filter "newArrivals": ${error.message}`)
        }
    }


    static async getProductsByFilter_offers(limit = 10) {
        try {
            const { rows } = await pool.query(`
                    SELECT
                        p.public_id AS product_public_id,
                        p.name AS product_name,
                        p.total_stock_quantity AS product_total_stock_quantity,
                        pv.public_id AS variant_public_id,
                        pv.unit_price AS variant_unit_price,
                        pv.installments AS variant_installments,
                        pv.is_on_sale AS variant_is_on_sale,
                        pv.stock_quantity AS variant_stock_quantity,
                        array_agg(DISTINCT pvi.image_url) AS variant_images,
                        vod.offer_type AS variant_offer_type,
                        vod.offer_value AS variant_offer_value,
                        vod.offer_installments AS variant_offer_installments,
                        COALESCE(AVG(pr.rating), 0) AS product_review_score,
	                    COUNT(DISTINCT pr.*) AS product_review_quantity
                    FROM
                        products p
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
                        ) AS vod ON vod.product_variant_id = pv.id
                        -- Aplica DISTINCT ON para pegar a primeira linha por produto e cor
                        LEFT JOIN (
                            SELECT DISTINCT ON (p.id, pv.color) p.id AS product_id, pv.color, pv.id AS variant_id
                            FROM products p
                            INNER JOIN product_variant pv ON p.id = pv.products_id
                            WHERE pv.stock_quantity > 0
                            ORDER BY p.id, pv.color, pv.stock_quantity DESC
                        ) unique_colors ON unique_colors.product_id = p.id AND unique_colors.color = pv.color
                        LEFT JOIN product_reviews pr ON p.id = pr.product_id
                    WHERE unique_colors.variant_id = pv.id AND pv.is_on_sale = true
                    GROUP BY
                        p.id,
                        pv.id,
                        vod.offer_type,
                        vod.offer_value,
                        vod.offer_installments
                    LIMIT $1
                `, [limit])
        } catch (error) {

        }
    }

    //FUNCIONANDO CERTO
    static async listProductsBySubcategoryRepository(filterCategorySubcategoryBy, category, subcategory, limit, offset) {
        try {
            var parameters = [category];
            const selectAndJoinsQuery = `
                    SELECT
                        p.public_id AS product_public_id,
                        p.name AS product_name,
                        p.total_stock_quantity AS product_total_stock_quantity,
                        pv.public_id AS variant_public_id,
                        pv.color AS variant_color_name,
                        pv.color_code AS variant_color_code,
                        pv.unit_price AS variant_unit_price,
                        pv.installments AS variant_installments,
                        pv.is_on_sale AS variant_is_on_sale,
                        pv.size AS variant_size,
                        pv.stock_quantity AS variant_stock_quantity,
                        array_agg(DISTINCT pvi.image_url) AS variant_images,
                        variant_offers.offer_type AS variant_offer_type,
                        variant_offers.offer_value AS variant_offer_value,
                        variant_offers.offer_installments AS variant_offer_installments,
                        COALESCE(
                            array_agg(DISTINCT jsonb_build_object(
                                'subcategory_id', product_subcategories.subcategory_id,
                                'subcategory_name', product_subcategories.subcategory_name,
                                'subcategory_description', product_subcategories.subcategory_description,
                                'category_id', product_subcategories.category_id,
                                'category_name', product_subcategories.category_name
                            )),
                            '{}'
                        ) AS subcategories,
                        COALESCE(AVG(pr.rating), 0) AS product_review_score,
	                    COUNT(DISTINCT pr.*) AS product_review_quantity
                    FROM
                        products p
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
                        -- Aplica DISTINCT ON para pegar a primeira linha por produto e cor
                        LEFT JOIN (
                            SELECT DISTINCT ON (p.id, pv.color) p.id AS product_id, pv.color, pv.id AS variant_id
                            FROM products p
                            INNER JOIN product_variant pv ON p.id = pv.products_id
                            ORDER BY p.id, pv.color, pv.stock_quantity DESC
                        ) unique_colors ON unique_colors.product_id = p.id AND unique_colors.color = pv.color
                        -- Subconsulta para agrupar subcategorias por produto
                        LEFT JOIN (
                            SELECT 
                                psa.product_id,
                                sbc.id AS subcategory_id,
                                sbc.name AS subcategory_name,
                                sbc.description AS subcategory_description,
                                ca.id AS category_id,
                                ca.name AS category_name
                            FROM product_subcategory_assignments psa
                            INNER JOIN sub_categories sbc ON sbc.id = psa.sub_category_id
                            INNER JOIN categories ca ON sbc.categories_id = ca.id
                        ) product_subcategories ON product_subcategories.product_id = p.id
                        LEFT JOIN product_reviews pr ON p.id = pr.product_id 
            `;
            if (subcategory) parameters.push(subcategory);
            const whereQuery = `
                WHERE unique_colors.variant_id = pv.id ${subcategory ? (filterCategorySubcategoryBy === 'id' ? 'AND product_subcategories.subcategory_id = $2' : 'AND product_subcategories.subcategory_name ILIKE $2') : ''} 
                ${filterCategorySubcategoryBy === 'id' ? 'AND product_subcategories.category_id = $1' : 'AND product_subcategories.category_name ILIKE $1'}
            `;
            const groupByQuery = `
                    GROUP BY
                        p.id,
                        pv.id,
                        variant_offers.offer_type,
                        variant_offers.offer_value,
                        variant_offers.offer_installments
            `;
            const orderByQuery = `
                    ORDER BY p.total_stock_quantity DESC
            `;
            const paginationQuery = `
                LIMIT $${parameters.length + 1} OFFSET $${parameters.length + 2}
            `;
            parameters.push(limit, offset);
            const { rows } = await pool.query((selectAndJoinsQuery + whereQuery + groupByQuery + orderByQuery + paginationQuery), parameters);
            return rows;
        } catch (error) {
            console.error('Error finding all products:', error);
            throw error;
        }
    }

    //FUNCIONANDO CERTO
    static async countTotalProducts(category, subcategory) {
        try {
            var parameters = [category];

            const selectAndJoinsQuery = `
                    SELECT
                        COUNT(DISTINCT pv.id) AS total_count
                    FROM
                        products p
                        INNER JOIN product_variant pv ON p.id = pv.products_id
                        -- Aplica DISTINCT ON para pegar a primeira linha por produto e cor
                        LEFT JOIN (
                            SELECT DISTINCT ON (p.id, pv.color) p.id AS product_id, pv.color, pv.id AS variant_id
                            FROM products p
                            INNER JOIN product_variant pv ON p.id = pv.products_id
                            WHERE pv.stock_quantity > 0
                            ORDER BY p.id, pv.color, pv.id DESC
                        ) unique_colors ON unique_colors.product_id = p.id AND unique_colors.color = pv.color
                        -- Subconsulta para agrupar subcategorias por produto
                        LEFT JOIN (
                            SELECT 
                                psa.product_id,
                                sbc.id AS subcategory_id,
                                sbc.name AS subcategory_name,
                                sbc.description AS subcategory_description,
                                ca.id AS category_id,
                                ca.name AS category_name
                            FROM product_subcategory_assignments psa
                            INNER JOIN sub_categories sbc ON sbc.id = psa.sub_category_id
                            INNER JOIN categories ca ON sbc.categories_id = ca.id
                        ) product_subcategories ON product_subcategories.product_id = p.id
            `;
            if (subcategory) parameters.push(subcategory);
            const whereQuery = `
                WHERE unique_colors.variant_id = pv.id ${subcategory ? 'AND product_subcategories.subcategory_name ILIKE $2' : ''} AND product_subcategories.category_name ILIKE $1
            `;
            const { rows } = await pool.query((selectAndJoinsQuery + whereQuery), parameters);
            return rows[0];
        } catch (error) {
            console.error('Error counting total products:', error);
            throw error;
        }
    }

    //FUNCIONANDO CERTO
    static async getProductAndFirstVariantByProductIdRepository(id) {
        try {
            const { rows } = await pool.query(`
                    SELECT
                        p.public_id AS product_public_id,
						p.name AS product_name,
						p.description AS product_description,
						p.total_stock_quantity,
						pv.public_id AS variant_public_id,
                        pv.color AS variant_color_name,
                        pv.color_code AS variant_color_code,
                        pv.unit_price AS variant_unit_price,
                        pv.installments AS variant_installments,
                        pv.is_on_sale AS variant_is_on_sale,
                        pv.size AS variant_size,
                        pv.stock_quantity AS variant_stock_quantity,
                        array_agg(DISTINCT pvi.image_url) AS variant_images,
                        variant_offers.offer_type AS variant_offer_type,
                        variant_offers.offer_value AS variant_offer_value,
                        variant_offers.offer_installments AS variant_offer_installments,
                        IF(COUNT(fi.*)>0, TRUE, FALSE) AS product_in_wishlist,
                        COALESCE(
                            array_agg(DISTINCT jsonb_build_object(
                                'subcategory_id', product_subcategories.subcategory_id,
                                'subcategory_name', product_subcategories.subcategory_name,
                                'subcategory_description', product_subcategories.subcategory_description,
                                'category_id', product_subcategories.category_id,
                                'category_name', product_subcategories.category_name
                            )),
                            '{}'
                        ) AS subcategories,
                        COALESCE(AVG(pr.rating), 0) AS product_review_score,
	                    COUNT(DISTINCT pr.*) AS product_review_quantity
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
                        -- Subconsulta para agrupar subcategorias por produto
                        LEFT JOIN (
                            SELECT 
                                psa.product_id,
                                sbc.id AS subcategory_id,
                                sbc.name AS subcategory_name,
                                sbc.description AS subcategory_description,
                                ca.id AS category_id,
                                ca.name AS category_name
                            FROM product_subcategory_assignments psa
                            INNER JOIN sub_categories sbc ON sbc.id = psa.sub_category_id
                            INNER JOIN categories ca ON sbc.categories_id = ca.id
                        ) product_subcategories ON product_subcategories.product_id = p.id
                        LEFT JOIN product_reviews pr ON p.id = pr.product_id
                        LEFT JOIN favorites_items fi ON fi.product_id = p.id 
					WHERE p.public_id = $1 AND pv.stock_quantity > 0
					GROUP BY
						p.id,
                        pv.id,
						variant_offers.offer_type,
                        variant_offers.offer_value,
                        variant_offers.offer_installments
                `, [id]);
            return rows[0];
        } catch (error) {
            console.error('Error finding product by id:', error);
            throw error;
        }
    };

    //FUNCIONANDO CERTO
    static async getProductByProductAndVariantIdRepository(id, sku) {
        try {
            const { rows } = await pool.query(`
                    SELECT
                        p.public_id AS product_public_id,
						p.name AS product_name,
						p.description AS product_description,
						p.total_stock_quantity,
						pv.public_id AS variant_public_id,
                        pv.color AS variant_color_name,
                        pv.color_code AS variant_color_code,
                        pv.unit_price AS variant_unit_price,
                        pv.installments AS variant_installments,
                        pv.is_on_sale AS variant_is_on_sale,
                        pv.size AS variant_size,
                        pv.stock_quantity AS variant_stock_quantity,
                        array_agg(DISTINCT pvi.image_url) AS variant_images,
                        variant_offers.offer_type AS variant_offer_type,
                        variant_offers.offer_value AS variant_offer_value,
                        variant_offers.offer_installments AS variant_offer_installments,
                        EXISTS(SELECT * FROM favorites_items WHERE product_id = p.id) AS product_in_wishlist,
                        COALESCE(
                            array_agg(DISTINCT jsonb_build_object(
                                'subcategory_id', product_subcategories.subcategory_id,
                                'subcategory_name', product_subcategories.subcategory_name,
                                'subcategory_description', product_subcategories.subcategory_description,
                                'category_id', product_subcategories.category_id,
                                'category_name', product_subcategories.category_name
                            )),
                            '{}'
                        ) AS subcategories,
                        COALESCE(AVG(pr.rating), 0) AS product_review_score,
	                    COUNT(DISTINCT pr.*) AS product_review_quantity
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
                        -- Subconsulta para agrupar subcategorias por produto
                        LEFT JOIN (
                            SELECT 
                                psa.product_id,
                                sbc.id AS subcategory_id,
                                sbc.name AS subcategory_name,
                                sbc.description AS subcategory_description,
                                ca.id AS category_id,
                                ca.name AS category_name
                            FROM product_subcategory_assignments psa
                            INNER JOIN sub_categories sbc ON sbc.id = psa.sub_category_id
                            INNER JOIN categories ca ON sbc.categories_id = ca.id
                        ) product_subcategories ON product_subcategories.product_id = p.id
                        LEFT JOIN product_reviews pr ON p.id = pr.product_id
					WHERE p.public_id = $1 AND p.is_active = true AND pv.public_id = $2
					GROUP BY
						p.id,
                        pv.id,
						variant_offers.offer_type,
                        variant_offers.offer_value,
                        variant_offers.offer_installments
                `, [id, sku]);
            return rows[0];
        } catch (error) {
            console.error('Error finding product by id:', error);
            throw error;
        }
    };

    //FUNCIONANDO CERTO
    static async createProductRepository(client, { productName, productDescription, brand, productTotalStock }) {
        try {
            const { rows } = await client.query(`
                INSERT INTO products (brand_id, name, description, total_stock_quantity)
                VALUES ($1, $2, $3, $4) RETURNING id
            `, [brand, productName, productDescription, productTotalStock]);
            const productId = rows[0].id
            return productId;
        } catch (error) {
            console.error('Error inserting in products table:', error);
            throw Error('Error inserting in products table:', error);
        }
    }

    //FUNCIONANDO CERTO
    static async assignSubcategoryRepository(client, product_id, subcategories) {
        try {
            for (const subcategory of subcategories) {
                await client.query(`
                    INSERT INTO product_subcategory_assignments(product_id, sub_category_id)
                    VALUES($1, $2)
                        `, [product_id, parseInt(subcategory)]);
            }
        } catch (error) {
            console.error('Error assigning categories: ', error);
            throw Error('Error assigning categories: ', error);
        }
    }

    //FUNCIONANDO CERTO
    static async getCategoriesAndSubcategories() {
        try {
            const { rows } = await pool.query('SELECT c.id AS category_id, c.name AS category_name, s.id AS subcategory_id, s.name AS subcategory_name FROM categories c LEFT JOIN sub_categories s ON c.id = s.categories_id ORDER BY c.id, s.id;');
            return rows;
        } catch (error) {
            console.error('Error getting categories and subcategories: ', error);
            throw error;
        }
    }

    //FUNCIONANDO CERTO
    static async getAllBrands() {
        try {
            const { rows } = await pool.query('SELECT id, name FROM brands ORDER BY id;');
            return rows;
        } catch (error) {
            console.error('Error getting brands: ', error);
            throw error;
        }
    }

    //FUNCIONANDO CERTO
    static async getAllActiveProductColors() {
        try {
            const { rows } = pool.query(`SELECT DISTINCT ON (pv.color) pv.color FROM product_variant pv GROUP BY pv.color`);
            return rows;
        } catch (error) {
            console.error('Error getting active product colors: ', error);
            throw error;
        }
    }

    static async searchProducts(query, limit = 10, page = 1) {
        try {
            // Calcular o offset para a paginação
            const offset = (page - 1) * limit;

            // Consulta ao banco de dados com paginação
            const { rows } = await pool.query(
                'SELECT * FROM products WHERE name ILIKE $1 LIMIT $2 OFFSET $3',
                [`%${query}%`, limit, offset]
            );

            // Garantir que todos os produtos tenham a propriedade variant_images
            const productsWithImages = rows.map(product => {
                if (!product.variant_images || product.variant_images.length === 0) {
                    product.variant_images = ['default-image.jpg', 'default-image-hover.jpg']; // Imagens padrão
                }
                return product;
            });

            // Retornar os resultados e informações de paginação
            return {
                products: productsWithImages,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(rows.length / limit), // Número total de páginas
                },
            };
        } catch (error) {
            console.error('Error searching products: ', error);
            throw error;
        }
    }

    static async countTotalSearchResults(query) {
        const searchQuery = `%${query}%`;
        const sql = `
            SELECT COUNT(*) FROM products
            WHERE name ILIKE $1;
        `;
        const { rows } = await pool.query(sql, [searchQuery]);
        return { total_count: parseInt(rows[0].count, 10) };
    }

    // Buscar produtos pela query de busca
    static async searchProductsByQuery(query, limit, offset) {
        const searchQuery = `%${query}%`;
        const sql = `
            SELECT * FROM products
            WHERE name ILIKE $1
            LIMIT $2 OFFSET $3;
        `;
        const { rows } = await pool.query(sql, [searchQuery, limit, offset]);
        return rows;
    }

}

export default ProductRepository

// -- Obtem todas as variantes de todos os produtos (1 variante por linha (agrupa as imagens em 1 array)) #Sem ofertas
// SELECT
// 	p.public_id AS product_public_id,
// 	p.name AS product_name,
// 	p.description AS product_description,
// 	pv.public_id AS variant_public_id,
// 	pv.color AS variant_color_name,
// 	pv.color_code AS variant_color_code,
// 	pv.unit_price AS variant_unit_price,
// 	pv.installments AS variant_installments,
// 	pv.is_on_sale AS variant_is_on_sale,
// 	pv.size AS variant_size,
// 	pv.stock_quantity AS variant_stock_quantity,
// 	array_agg(pvi.image_url ORDER BY pvi.id DESC) AS variant_images
// FROM
// 	products p
// 	INNER JOIN product_variant pv ON p.id = pv.products_id
// 	INNER JOIN product_variant_images_assignments pvia ON pv.id = pvia.product_variant_id
// 	INNER JOIN product_variant_images pvi ON pvia.product_variant_images_id = pvi.id
// GROUP BY
// 	pv.id,
// 	p.id

// -- Obtem todas as variantes de todos os produtos (1 variante por linha (agrupa as imagens em 1 array)) #Com ofertas
// SELECT
// 	p.public_id AS product_public_id,
// 	p.name AS product_name,
// 	p.description AS product_description,
// 	pv.public_id AS variant_public_id,
// 	pv.color AS variant_color_name,
// 	pv.color_code AS variant_color_code,
// 	pv.unit_price AS variant_unit_price,
// 	pv.installments AS variant_installments,
// 	pv.is_on_sale AS variant_is_on_sale,
// 	pv.size AS variant_size,
// 	pv.stock_quantity AS variant_stock_quantity,
// 	array_agg(pvi.image_url ORDER BY pvi.id DESC) AS variant_images,
// 	variant_offers.offer_type AS variant_offer_type,
// 	variant_offers.offer_value AS variant_offer_value,
// 	variant_offers.offer_installments AS variant_offer_installments
// FROM
// 	products p
// 	INNER JOIN product_variant pv ON p.id = pv.products_id
// 	INNER JOIN product_variant_images_assignments pvia ON pv.id = pvia.product_variant_id
// 	INNER JOIN product_variant_images pvi ON pvia.product_variant_images_id = pvi.id
// 	-- Aplica DISTINCT ON para pegar a primeira linha da tabela de ofertas por variante
// 	LEFT JOIN (
// 		SELECT DISTINCT ON (pvo.product_variant_id) pvo.offer_type, pvo.offer_value, pvo.offer_installments, pvo.product_variant_id
// 		FROM product_variant pv
// 		INNER JOIN product_variant_offers pvo ON pv.id = pvo.product_variant_id
// 		WHERE pvo.is_active = true
// 		ORDER BY pvo.product_variant_id DESC
// 		LIMIT 1
// 	) variant_offers ON variant_offers.product_variant_id = pv.id
// GROUP BY
// 	pv.id,
// 	p.id,
// 	variant_offers.offer_type,
// 	variant_offers.offer_value,
// 	variant_offers.offer_installments

// -- Obtem 1 variante (primeira) de cada cor por produto #Com ofertas

// SELECT
//     p.public_id AS product_public_id,
//     p.name AS product_name,
//     p.description AS product_description,
//     pv.public_id AS variant_public_id,
//     pv.color AS variant_color_name,
//     pv.color_code AS variant_color_code,
//     pv.unit_price AS variant_unit_price,
//     pv.installments AS variant_installments,
//     pv.is_on_sale AS variant_is_on_sale,
//     pv.size AS variant_size,
//     pv.stock_quantity AS variant_stock_quantity,
//     array_agg(DISTINCT pvi.image_url) AS variant_images,
// 	variant_offers.offer_type AS variant_offer_type,
// 	variant_offers.offer_value AS variant_offer_value,
// 	variant_offers.offer_installments AS variant_offer_installments,
// 	COALESCE(
//         array_agg(DISTINCT jsonb_build_object(
//             'subcategory_id', product_subcategories.subcategory_id,
//             'subcategory_name', product_subcategories.subcategory_name,
//             'subcategory_description', product_subcategories.subcategory_description,
//             'category_id', product_subcategories.category_id,
//             'category_name', product_subcategories.category_name
//         )),
//         '{}'
//     ) AS subcategories
// FROM
//     products p
//     INNER JOIN product_variant pv ON p.id = pv.products_id
//     INNER JOIN product_variant_images_assignments pvia ON pv.id = pvia.product_variant_id
//     INNER JOIN product_variant_images pvi ON pvia.product_variant_images_id = pvi.id
// 	-- Aplica DISTINCT ON para pegar a primeira linha da tabela de ofertas por variante
// 	LEFT JOIN (
// 		SELECT DISTINCT ON (pvo.product_variant_id) pvo.offer_type, pvo.offer_value, pvo.offer_installments, pvo.product_variant_id
// 		FROM product_variant pv
// 		INNER JOIN product_variant_offers pvo ON pv.id = pvo.product_variant_id
// 		WHERE pvo.is_active = true
// 		ORDER BY pvo.product_variant_id DESC
// 		LIMIT 1
// 	) variant_offers ON variant_offers.product_variant_id = pv.id
//     -- Aplica DISTINCT ON para pegar a primeira linha por produto e cor
//     LEFT JOIN (
//         SELECT DISTINCT ON (p.id, pv.color) p.id AS product_id, pv.color, pv.id AS variant_id
//         FROM products p
//         INNER JOIN product_variant pv ON p.id = pv.products_id
// 		WHERE pv.stock_quantity > 0
//         ORDER BY p.id, pv.color, pv.id DESC
//     ) unique_colors ON unique_colors.product_id = p.id AND unique_colors.color = pv.color
// 	-- Subconsulta para agrupar subcategorias por produto
//     LEFT JOIN (
//         SELECT
//             psa.product_id,
//             sbc.id AS subcategory_id,
//             sbc.name AS subcategory_name,
//             sbc.description AS subcategory_description,
//             ca.id AS category_id,
//             ca.name AS category_name
//         FROM product_subcategory_assignments psa
//         INNER JOIN sub_categories sbc ON sbc.id = psa.sub_category_id
//         INNER JOIN categories ca ON sbc.categories_id = ca.id
//     ) product_subcategories ON product_subcategories.product_id = p.id
// WHERE unique_colors.variant_id = pv.id
// GROUP BY
//     p.id,
//     pv.id,
// 	variant_offers.offer_type,
// 	variant_offers.offer_value,
// 	variant_offers.offer_installments
// ORDER BY p.id, pv.color;

// -- Obtem todas as variantes de todos os produtos (1 variante por linha (agrupa as imagens em 1 array)) #Com ofertas #Com subcategorias e categorias
// SELECT
// 	p.public_id AS product_public_id,
// 	p.name AS product_name,
// 	p.description AS product_description,
// 	pv.public_id AS variant_public_id,
// 	pv.color AS variant_color_name,
// 	pv.color_code AS variant_color_code,
// 	pv.unit_price AS variant_unit_price,
// 	pv.installments AS variant_installments,
// 	pv.is_on_sale AS variant_is_on_sale,
// 	pv.size AS variant_size,
// 	pv.stock_quantity AS variant_stock_quantity,
// 	array_agg(DISTINCT pvi.image_url) AS variant_images,
// 	variant_offers.offer_type AS variant_offer_type,
// 	variant_offers.offer_value AS variant_offer_value,
// 	variant_offers.offer_installments AS variant_offer_installments,
// 	array_agg(json_build_object(
// 		'subcategory_id', sbc.id,
// 		'subcategory_name', sbc.name,
// 		'description', sbc.description,
// 		'category_id', sbc.categories_id,
// 		'category_name', ca.name
// 	)) AS product_subcategories
// FROM
// 	products p
// 	INNER JOIN product_variant pv ON p.id = pv.products_id
// 	INNER JOIN product_variant_images_assignments pvia ON pv.id = pvia.product_variant_id
// 	INNER JOIN product_variant_images pvi ON pvia.product_variant_images_id = pvi.id
// 	-- Aplica DISTINCT ON para pegar a primeira linha da tabela de ofertas por variante
// 	LEFT JOIN (
// 		SELECT DISTINCT ON (pvo.product_variant_id) pvo.offer_type, pvo.offer_value, pvo.offer_installments, pvo.product_variant_id
// 		FROM product_variant pv
// 		INNER JOIN product_variant_offers pvo ON pv.id = pvo.product_variant_id
// 		WHERE pvo.is_active = true
// 		ORDER BY pvo.product_variant_id DESC
// 		LIMIT 1
// 	) variant_offers ON variant_offers.product_variant_id = pv.id
// 	INNER JOIN product_subcategory_assignments psa ON psa.product_id = p.id
// 	INNER JOIN sub_categories sbc ON sbc.id = psa.sub_category_id
// 	INNER JOIN categories ca ON sbc.categories_id = ca.id
// GROUP BY
// 	pv.id,
// 	p.id,
// 	variant_offers.offer_type,
// 	variant_offers.offer_value,
// 	variant_offers.offer_installments

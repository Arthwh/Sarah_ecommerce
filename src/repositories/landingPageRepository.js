import pool from '../db.js';

class LandingPageRepository {
    static async getActiveLandingPageComponents() {
        try {
            const { rows } = await pool.query(`
                    SELECT
                        lpc.id,
                        lpc.section_model,
                        lpc.content_type,
                        lpc.section_position,
                        lpc.section_title,
                        lpc.section_product_type,
                        lpc.section_product_limit,
                        lpc.section_product_type_category_id,
                        lpc.section_product_type_subcategory_id,
                        lpc.is_active
                    FROM landing_page_components lpc
                    WHERE lpc.is_active = true
                    ORDER BY lpc.section_position ASC
                `);
            return rows;
        } catch (error) {
            console.error('Error while getting landing page components: ', error);
            throw Error('Error while getting landing page components: ', error.message)
        }
    }

    static async getBannerComponentData(componentId) {
        try {
            const { rows } = await pool.query(`
                    SELECT 
                        lpi.component_id,
                        lpi.element_order,
                        lpi.image_url_banner_large,
                        lpi.image_url_banner_small,
                        lpi.image_banner_link,
                        lpi.image_banner_link_name
                    FROM landing_page_images lpi INNER JOIN landing_page_components lpc ON lpi.component_id = lpc.id
                    WHERE lpc.id = $1
                    ORDER BY lpi.element_order
                `, [componentId]);
            return rows;
        } catch (error) {
            console.error('Error while getting banner component data: ', error);
            throw Error('Error while getting banner component data: ', error.message)
        }
    }

    static async saveLandingPageComponent(client, { componentId = 0, componentContentType, componentSectionModel, componentSectionPosition, endDate, productType = null, productTypeCategory, productTypeSubcategory, productLimit = null, title = null }) {
        try {
            const parameters = [componentSectionModel, componentContentType, componentSectionPosition, title, productType, productTypeCategory, productTypeSubcategory, productLimit, endDate];
            const updateQuery = `
                UPDATE landing_page_components 
                SET section_model = $1, content_type = $2, section_position = $3, section_title = $4, section_product_type = $5, 
                    section_product_type_category_id = $6, section_product_type_subcategory_id = $7, section_product_limit = $8, start_date = NOW(), end_date = $9
                WHERE id = $10;`
            const insertQuery = `
                INSERT INTO landing_page_components (section_model, content_type, section_position, section_title, section_product_type, section_product_type_category_id, section_product_type_subcategory_id, section_product_limit, start_date, end_date) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9)
            `;
            var query = insertQuery;
            if (componentId !== 0) {
                parameters.push(componentId);
                query = updateQuery;
            }
            await client.query(query, parameters);
        } catch (error) {
            console.error('Error while saving landing page component: ', error);
            throw Error('Error while saving landing page component: ', error.message)
        }
    }

    static async saveBannerImages() {
        try {

        } catch (error) {

        }
    }

    static async saveCardsImages() {
        try {

        } catch (error) {

        }
    }
}

export default LandingPageRepository;
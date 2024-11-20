import pool from '../db.js'

class LandingPageRepository {
    static async getActiveLandingPageComponents() {
        try {
            const { rows } = await pool.query(`
                    SELECT
                        lpc.id,
                        lpc.section_name,
                        lpc.section_model,
                        lpc.content_type,
                        lpc.section_position,
                        lpc.section_title,
                        lpc.section_product_type,
                        lpc.section_product_limit,
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
}

export default LandingPageRepository;
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

    static async getActiveLandingPageImages(componentId) {
        try {
            const { rows } = await pool.query(`
                    SELECT 
                        lpi.id,
                        lpi.component_id,
                        lpi.element_order,
                        lpi.image_url_banner_large,
                        lpi.image_url_banner_small,
                        lpi.image_banner_link,
                        lpi.image_banner_link_name,
                        lpi.image_url_card,
                        lpi.image_card_link,
                        lpi.image_card_link_name, 
                        lpi.end_date
                    FROM landing_page_images lpi INNER JOIN landing_page_components lpc ON lpi.component_id = lpc.id
                    WHERE lpc.id = $1 AND lpi.is_active = true
                    ORDER BY lpi.element_order
                `, [componentId]);
            return rows;
        } catch (error) {
            console.error('Error while getting banner component data: ', error);
            throw Error('Error while getting banner component data: ', error.message)
        }
    }

    static async setLandingPageImages(client, componentId, { index, imageLargePath, imageSmallPath, link, linkName, endDate = null }) {
        try {
            await client.query(`
                INSERT INTO landing_page_images (component_id, element_order, image_url_banner_large, image_url_banner_small, image_banner_link_name, 
                image_banner_link, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)
            `, [componentId, index, imageLargePath, imageSmallPath, linkName, link, endDate]);
        } catch (error) {
            console.error('Error while setting landing page images: ', error);
            throw Error('Error while setting landing page images: ', error.message)
        }
    }

    static async deactivateLandingPageImagesById(client, id) {
        try {
            await client.query(`
                UPDATE landing_page_images
                SET is_active = false
                WHERE id = $1
            `, [id]);
        } catch (error) {
            console.error('Error while deactivating landing page images: ', error);
            throw Error('Error while deactivating landing page images: ', error.message)
        }
    }

    static async deactivateLandingPageImagesByLandingPageComponentId(client, id) {
        try {
            await client.query(`
                    UPDATE landing_page_images
                    SET is_active = false
                    WHERE component_id = $1
                `, [id]);
        } catch (error) {
            console.error('Error while deactivating landing page images: ', error);
            throw Error('Error while deactivating landing page images: ', error.message)
        }
    }

    static async deactivateLandingPageComponent(client, id) {
        try {
            await client.query(`
                UPDATE landing_page_components
                SET is_active = false
                WHERE id = $1
            `, [id]);
        } catch (error) {
            console.error('Error while deactivating landing page components: ', error);
            throw Error('Error while deactivating landing page components: ', error.message)
        }
    }

    static async updateLandingPageComponent(client, { componentId, componentContentType, componentSectionModel, componentSectionPosition, endDate = null, productType = null, productTypeCategory = null, productTypeSubcategory = null, productLimit = null, title = null }) {
        try {
            await client.query(`
            UPDATE landing_page_components 
            SET section_model = $1, content_type = $2, section_position = $3, section_title = $4, section_product_type = $5, 
                section_product_type_category_id = $6, section_product_type_subcategory_id = $7, section_product_limit = $8, start_date = NOW(), end_date = $9
            WHERE id = $10`,
                [componentSectionModel, componentContentType, componentSectionPosition, title, productType, productTypeCategory, productTypeSubcategory, productLimit, endDate, componentId]);
        } catch (error) {
            console.error('Error while updating landing page component: ', error);
            throw Error('Error while updating landing page component: ', error.message);
        }
    }

    static async addLandingPageComponent(client, { componentContentType, componentSectionModel, componentSectionPosition, endDate = null, productType = null, productTypeCategory = null, productTypeSubcategory = null, productLimit = null, title = null }) {
        try {
            await client.query(`
            INSERT INTO landing_page_components (section_model, content_type, section_position, section_title, section_product_type, section_product_type_category_id, section_product_type_subcategory_id, section_product_limit, start_date, end_date, is_active) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9, 'true')`,
                [componentSectionModel, componentContentType, componentSectionPosition, title, productType, productTypeCategory, productTypeSubcategory, productLimit, endDate]);
        } catch (error) {
            console.error('Error while adding landing page component: ', error);
            throw Error('Error while adding landing page component: ', error.message);
        }
    }
}

export default LandingPageRepository;
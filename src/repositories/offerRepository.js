import pool from '../db.js';

class OfferRepository {
    static async createOffer(offerData) {
        try {
            const query = `
                INSERT INTO product_variant_offers (
                    product_variant_id, offer_type, offer_value, offer_installments, 
                    start_date, end_date, is_active
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `;
            const values = [
                offerData.product_variant_id, offerData.offer_type, offerData.offer_value,
                offerData.offer_installments, offerData.start_date, offerData.end_date,
                offerData.is_active ?? true
            ];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error("Error creating offer:", error);
            throw Error("Error creating offer", error);
        }
    }

    static async updateOffer(offerId, offerData) {
        try {
            const query = `
                UPDATE product_variant_offers
                SET product_variant_id = $1, offer_type = $2, offer_value = $3, 
                    offer_installments = $4, start_date = $5, end_date = $6, 
                    is_active = $7, created_at = CURRENT_TIMESTAMP
                WHERE id = $8
                RETURNING *;
            `;
            const values = [
                offerData.product_variant_id, offerData.offer_type, offerData.offer_value,
                offerData.offer_installments, offerData.start_date, offerData.end_date,
                offerData.is_active, offerId
            ];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error("Error updating offer:", error);
            throw Error("Error updating offer", error);
        }
    }

    static async deleteOffer(offerId) {
        try {
            const query = `
                DELETE FROM product_variant_offers
                WHERE id = $1
                RETURNING *;
            `;
            const { rows } = await pool.query(query, [offerId]);
            return rows[0];
        } catch (error) {
            console.error("Error deleting offer:", error);
            throw Error("Error deleting offer", error);
        }
    }

    static async getActiveOffers() {
        try {
            const query = `
                SELECT * FROM product_variant_offers
                WHERE is_active = TRUE AND start_date <= NOW() AND end_date >= NOW()
                ORDER BY start_date DESC;
            `;
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error("Error fetching active offers:", error);
            throw Error("Error fetching active offers", error);
        }
    }
}

export default OfferRepository;

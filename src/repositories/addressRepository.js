import pool from '../db.js';
import { Address } from '../models/addressModel.js';

class AddressRepository {
    static async addAddress(cityId, addressData) {
        try {
            const { road, complement, zip_code } = addressData;
            const query = `
            INSERT INTO addresses (city_id, road, complement, zip_code, is_active)
            VALUES ($1, $2, $3, $4, TRUE)
            RETURNING *;
        `;
            const values = [cityId, road, complement, zip_code];
            const { rows } = await pool.query(query, values);
            return Address.mapFromRow(rows[0]);
        } catch (error) {
            console.error('Error adding new address:', error);
            throw Error('EError adding new address:', error);
        }
    }

    static async updateAddress(addressId, addressData) {
        try {
            const { city_id, road, complement, zip_code, is_active } = addressData;
            const query = `
            UPDATE addresses
            SET city_id = $1, road = $2, complement = $3, zip_code = $4, is_active = $5, updated_at = CURRENT_TIMESTAMP
            WHERE id = $6
            RETURNING *;
        `;
            const values = [city_id, road, complement, zip_code, is_active, addressId];
            const { rows } = await pool.query(query, values);
            return Address.mapFromRow(rows[0]);
        } catch (error) {
            console.error('Error updating address:', error);
            throw Error('Error updating address:', error);
        }
    }

    static async deleteAddress(addressId) {
        try {
            const query = `
            DELETE FROM addresses
            WHERE id = $1
            RETURNING *;
        `;
            const { rows } = await pool.query(query, [addressId]);
            return Address.mapFromRow(rows[0]);
        } catch (error) {
            console.error('Error deleting address:', error);
            throw Error('Error deleting address:', error);
        }
    }

    static async getAddressesByUser(userId) {
        try {
            const query = `
            SELECT a.* FROM addresses a
            JOIN user_address_assignments ua ON ua.address_id = a.id
            WHERE ua.user_id = $1 AND a.is_active = TRUE
            ORDER BY a.created_at DESC;
        `;
            const { rows } = await pool.query(query, [userId]);
            return rows.map(row => Address.mapFromRow(row));
        } catch (error) {
            console.error('Error getting user addresses:', error);
            throw Error('Error getting user addresses:', error);
        }
    }

    static async assignAddressToUser(userId, addressId) {
        try {
            const query = `
            INSERT INTO user_address_assignments (user_id, address_id)
            VALUES ($1, $2)
            ON CONFLICT (user_id, address_id) DO NOTHING
            RETURNING *;
        `;
            const { rows } = await pool.query(query, [userId, addressId]);
            return rows[0];
        } catch (error) {
            console.error('Error assigning user address:', error);
            throw Error('Error assigning user address:', error);
        }
    }

    static async removeAddressFromUser(userId, addressId) {
        try {
            const query = `
            DELETE FROM user_address_assignments
            WHERE user_id = $1 AND address_id = $2
            RETURNING *;
        `;
            const { rows } = await pool.query(query, [userId, addressId]);
            return rows[0];
        } catch (error) {
            console.error('Error removing user address assignment:', error);
            throw Error('Error removing user address assignment:', error);
        }
    }
}

export default AddressRepository;
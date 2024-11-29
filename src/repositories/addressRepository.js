import pool from '../db.js';
import { Address } from '../models/addressModel.js';

class AddressRepository {
    static async addAddress(userId, addressData) {
        try {
            const { city_id, name, number, road, complement, zip_code } = addressData;

            const insertAddressQuery = `
                INSERT INTO addresses (city_id, name, number, road, complement, zip_code, is_active)
                VALUES ($1, $2, $3, $4, $5, $6, TRUE)
                RETURNING *;
            `;
            const addressValues = [city_id, name, number, road, complement, zip_code];
            const { rows: addressRows } = await pool.query(insertAddressQuery, addressValues);
            const newAddress = addressRows[0];

            const assignAddressQuery = `
                INSERT INTO user_address_assignments (user_id, address_id)
                VALUES ($1, $2)
                ON CONFLICT (user_id, address_id) DO NOTHING
                RETURNING *;
            `;
            const assignValues = [userId, newAddress.id];
            await pool.query(assignAddressQuery, assignValues);

            return Address.mapFromRow(newAddress);
        } catch (error) {
            console.error('Error adding new address and assigning to user:', error);
            throw Error('Error adding new address and assigning to user:', error);
        }
    }

    static async updateAddress(addressId, addressData) {
        try {
            const { city_id, name, number, road, complement, zip_code, is_active } = addressData;
            const query = `
                UPDATE addresses
                SET city_id = $1, name = $2, number = $3, road = $4, complement = $5, zip_code = $6, is_active = $7, updated_at = CURRENT_TIMESTAMP
                WHERE id = $8
                RETURNING *;
            `;
            const values = [city_id, name, number, road, complement, zip_code, is_active, addressId];
            const { rows } = await pool.query(query, values);
            return Address.mapFromRow(rows[0]);
        } catch (error) {
            console.error('Error updating address:', error);
            throw Error('Error updating address:', error);
        }
    }

    static async deleteAddress(userId, addressId) {
        try {
            const removeAssignmentQuery = `
                DELETE FROM user_address_assignments
                WHERE user_id = $1 AND address_id = $2
                RETURNING *;
            `;
            const { rows: removedAssignmentRows } = await pool.query(removeAssignmentQuery, [userId, addressId]);

            if (removedAssignmentRows.length === 0) {
                throw new Error("Address is not assigned to the user or does not exist.");
            }

            const deleteAddressQuery = `
                DELETE FROM addresses
                WHERE id = $1
                RETURNING *;
            `;
            const { rows: deletedAddressRows } = await pool.query(deleteAddressQuery, [addressId]);

            if (deletedAddressRows.length === 0) {
                throw new Error("Address does not exist or could not be deleted.");
            }

            return Address.mapFromRow(deletedAddressRows[0]);
        } catch (error) {
            console.error('Error deleting address and removing assignment:', error);
            throw Error('Error deleting address and removing assignment:', error);
        }
    }



    static async getAddressesByUser(userId) {
        try {
            const query = `
                SELECT a.* 
                FROM addresses a
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

}

export default AddressRepository;
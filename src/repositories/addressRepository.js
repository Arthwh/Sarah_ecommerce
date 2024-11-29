import pool from '../db.js';
import { Address } from '../models/addressModel.js';

class AddressRepository {
    static async addAddress(userId, address_name, street, number, country_id, state_id, city, zipCode, complement) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const cityReturing = await client.query(`
                    INSERT INTO cities (name, state_id) VALUES ($1, $2) RETURNING id
                `, [city, state_id]);
            const cityid = cityReturing.rows[0].id
            const addressesReturning = await client.query(`
                    INSERT INTO addresses (name, road, complement, zip_code, number, city_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
                `, [address_name, street, complement, zipCode, number, cityid]);

            const addressId = addressesReturning.rows[0].id;
            await client.query(`
                    INSERT INTO user_address_assignments (user_id, address_id) VALUES ($1, $2)
                `, [userId, addressId]);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error adding new address:', error);
            throw Error('EError adding new address:' + error);
        } finally {
            client.release();
        }
    }

    static async updateAddress(addressId, address_name, street, number, country_id, state_id, city, zipCode, complement) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const { rows } = await client.query(`
                    SELECT c.id 
                    FROM cities c 
                        INNER JOIN states s ON s.id = c.state_id
                        INNER JOIN countries cy ON cy.id = s.country_id
                    WHERE c.name LIKE $1 AND s.id = $2 AND cy.id = $3
                `, [city, state_id, country_id]);

            let cityId = rows[0]?.id
            if (!cityId) {
                const newCityId = await client.query(`
                    INSERT INTO cities (name, state_id) VALUES ($1, $2) RETURNING id
                `, [city, state_id]);
                cityId = newCityId.rows[0].id
            }
            await client.query(`
                    UPDATE addresses
                    SET name = $1, road = $2, number = $3, complement = $4, zip_code = $5, city_id = $6
                    WHERE id = $7
                `, [address_name, street, number, complement, zipCode, cityId, addressId]);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error updating address:', error);
            throw Error('Error updating address:' + error);
        }
        finally {
            client.release();
        }
    }

    static async deleteAddress(userId, addressId) {
        try {
            const { rows } = await pool.query(`
            UPDATE addresses 
            SET is_active = false
            WHERE id = $1
        `, [addressId]);
            return rows[0];
        } catch (error) {
            console.error('Error deleting address:', error);
            throw Error('Error deleting address:' + error);
        }
    }



    static async getAddressesByUser(userId) {
        try {
            const { rows } = await pool.query(`
                SELECT
                    a.id,
                    a.name, 
                    a.road AS street,
                    a.complement,
                    a.zip_code AS zipCode,
                    a.number,
                    c.name AS city,
                    s.name AS state
                FROM addresses a
                    INNER JOIN user_address_assignments ua ON ua.address_id = a.id
                    INNER JOIN cities c ON c.id = a.city_id
                    INNER JOIN states s ON s.id = c.state_id
                WHERE ua.user_id = $1 AND a.is_active = TRUE
                ORDER BY a.created_at DESC;
            `, [userId]);
            return rows;
        } catch (error) {
            console.error('Error getting user addresses:', error);
            throw Error('Error getting user addresses:' + error);
        }
    }

    static async getAddressById(userId, addressId) {
        try {
            const { rows } = await pool.query(`
                    SELECT 
                        a.id,
                        a.name, 
                        a.road AS street,
                        a.complement,
                        a.zip_code AS zipCode,
                        a.number,
                        c.name AS city,
                        c.id AS city_id,
                        s.name AS state,
                        s.id AS state_id,
                        s.country_id
                    FROM addresses a
                        INNER JOIN user_address_assignments ua ON ua.address_id = a.id
                        INNER JOIN cities c ON c.id = a.city_id
                        INNER JOIN states s ON s.id = c.state_id
                    WHERE ua.user_id = $1 AND a.id = $2 AND a.is_active = TRUE
                    ORDER BY a.created_at DESC;
                `, [userId, addressId]);

            return rows[0];
        } catch (error) {
            console.error('Error getting address by id:', error);
            throw Error('Error getting address by id:' + error);
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
            throw Error('Error assigning user address:' + error);
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
            throw Error('Error removing user address assignment:' + error);
        }
    }

    static async getAllCountries() {
        try {
            const { rows } = await pool.query(`
                    SELECT 
                        c.id AS country_id,
                        c.name AS country_name,
                        c.abbreviation AS country_abbreviation
                    FROM countries c
                    ORDER BY c.name ASC
                `);
            return rows;
        } catch (error) {
            console.error('Error getting countries:', error);
            throw Error('Error getting countries:' + error);
        }
    }

    static async getAllStatesFromCountryId(id) {
        try {
            const { rows } = await pool.query(`
                    SELECT 
                        c.id AS country_id,
                        s.id AS state_id,
                        s.name AS state_name,
                        s.abbreviation AS state_abbreviation
                    FROM states s INNER JOIN countries c ON c.id = s.country_id 
                    WHERE country_id = $1
                    ORDER BY s.name ASC
                `, [id]);

            return rows;
        } catch (error) {
            console.error('Error getting states from country id:', error);
            throw Error('Error getting states from country id:' + error);
        }
    }
}

export default AddressRepository;
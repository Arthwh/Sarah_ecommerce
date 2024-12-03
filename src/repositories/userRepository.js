import pool from '../db.js'
import { User } from '../models/userModel.js'

class UserRepository {
    static async getAllUsersRepository() {
        try {
            const { rows } = await pool.query('SELECT * FROM users');
            return rows.map(row => new User(row));
        } catch (error) {
            console.error('Error finding all users:', error);
            throw error;
        }
    }

    static async getUserByIdRepository(id) {
        try {
            const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            return new User(rows[0]);
        } catch (error) {
            console.error('Error finding user by id:', error);
            throw error;
        }
    }

    static async getUserByEmailRepository(email) {
        try {
            const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            return new User(rows[0]);
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }

    static async createUserRepository({ name, email, password, role, phone_number, birthdate, gender, cpf }) {
        try {
            const { rows } = await pool.query(
                "INSERT INTO users (name, email, password, role, phone_number, birthdate, gender, cpf) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
                [name, email, password, role, phone_number, birthdate, gender, cpf]
            );
            return rows[0].id;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async updateUserRepository(userId, user_name, user_email, user_phone_number, user_gender) {
        try {
            await pool.query(`
                UPDATE users 
                SET name = $1, email = $2, phone_number = $3, gender = $4 
                WHERE id = $5
                `, [user_name, user_email, user_phone_number, user_gender, userId]);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    static async deleteUserRepository(id) {
        try {
            const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    static async checkIfEmailExists(email) {
        try {
            const { rows } = await pool.query(`
                SELECT COUNT(1) AS email_count
                FROM users
                WHERE email = $1`, [email]);
            return parseInt(rows[0].email_count) > 0
        } catch (error) {
            console.error('Error checking if email exists:', error);
            throw error;
        }
    }

    static async getUserProfileData(userId) {
        try {
            const { rows } = await pool.query(`
                    SELECT
                        u.id AS user_id,
                        u.public_id AS user_public_id,
                        u.name AS user_name,
                        u.email AS user_email,
                        u.phone_number AS user_phone_number,
                        u.birthdate AS user_birthdate,
                        u.gender AS user_gender,
                        u.cpf AS user_cpf,
                        u.created_at AS user_account_created_at
                    FROM users u
                    WHERE u.id = $1
                `, [userId]);
            return rows[0];
        } catch (error) {
            console.error('Error getting user profile data:', error);
            throw error;
        }
    }
}

export default UserRepository
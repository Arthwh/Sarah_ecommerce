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

    static async updateUserRepository(id, { name, email, password, role, phone_number, birthdate, gender, cpf }) {
        try {
            const { rows } = await pool.query(
                'UPDATE users SET name = $1, email = $2, password = $3, role = $4, phone_number = $5, birthdate = $6, gender = $7, cpf = $8 WHERE id = $9 RETURNING *',
                [name, email, password, role, phone_number, birthdate, gender, cpf, id]
            );
            return rows[0];
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

    static async getUserCartCountRepository(userId) {
        try {
            const { rows } = await pool.query(`
                SELECT COUNT(*) 
                FROM shopping_cart_items sci
                JOIN shopping_carts sc ON sc.id = sci.shopping_cart_id
                WHERE sc.user_id = $1`, [userId]);

            return parseInt(rows[0].count);
        } catch (error) {
            console.error('Error getting cart count:', error);
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
}

export default UserRepository
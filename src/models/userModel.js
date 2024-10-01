import pool from '../db/db.js'
import bcrypt from 'bcrypt'

class UserModel {
    static async getAllUsers() {
        const { rows } = await pool.query('SELECT * FROM users');
        return rows;
    }

    static async getUserById(id) {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return rows[0];
    }

    static async getUserByEmail(email) {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return rows[0];
    }

    static async createUser({ name, email, password, role, phone_number_1, phone_number_2, birthdate, gender, cpf, created_at, updated_at, is_active }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { rows } = await pool.query(
            'INSERT INTO users (name, email, password, role, phone_number_1, phone_number_2, birthdate, gender, cpf, created_at, updated_at, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            [name, email, hashedPassword, role, phone_number_1, phone_number_2, birthdate, gender, cpf, created_at, updated_at, is_active]
        );
        return rows[0];
    }

    static async updateUser(id, { name, email, password, role, phone_number_1, phone_number_2, birthdate, gender, cpf, created_at, updated_at, is_active }) {
        const { rows } = await pool.query(
            'UPDATE users SET name = $1, email = $2, password = $3, role = $4, phone_number_1 = $5, phone_number_2 = $6, birthdate = $7, gender = $8, cpf = $9, created_at = $10, updated_at = $11, is_active = $12 WHERE id = $13 RETURNING *',
            [name, email, password, role, phone_number_1, phone_number_2, birthdate, gender, cpf, created_at, updated_at, is_active, id]
        );
        return rows[0];
    }

    static async deleteUser(id) {
        const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }
}

export default UserModel;
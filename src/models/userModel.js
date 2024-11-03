export class User {
    constructor({ id, public_id, name, email, password, role, phone_number, birthdate, gender, cpf }) {
        this.id = id;
        this.public_id = public_id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.role = role
        this.phone_number = phone_number;
        this.gender = gender;
        this.cpf = cpf;
    }
}

// Método para validar dados do usuário
export function validate(userData) {
    const { public_id, name, email, password, role, phone_number, birthdate, gender, cpf } = userData;
    if (!public_id || !name || !email || !password || !role || !phone_number || !birthdate || !gender || !cpf) {
        return false
    }
    return true
}

// import pool from '../db.js'
// import bcrypt from 'bcrypt'

// class UserModel {
//     static async getAllUsers() {
//         const { rows } = await pool.query('SELECT * FROM users');
//         return rows;
//     }

//     static async getUserById(id) {
//         const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
//         return rows[0];
//     }

//     static async getUserByEmail(email) {
//         const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//         return rows[0];
//     }

//     static async createUser({ registerEmail, cpf, name, birthdate, phone_number, registerPassword, gender }) {
//         const hashedPassword = await bcrypt.hash(registerPassword, 10);
//         const { rows } = await pool.query(
//             "INSERT INTO users (email, cpf, name, birthdate, phone_number, password, gender, role) VALUES ($1, $2, $3, $4, $5, $6, $7, 1) RETURNING *",
//             [registerEmail, cpf, name, birthdate, phone_number, hashedPassword, gender]
//         );
//         return rows[0];
//     }

//     static async updateUser(id, { name, email, password, role, phone_number, birthdate, gender, cpf, created_at, updated_at, is_active }) {
//         const { rows } = await pool.query(
//             'UPDATE users SET name = $1, email = $2, password = $3, role = $4, phone_number = $5, birthdate = $6, gender = $7, cpf = $8, created_at = $9, updated_at = $10, is_active = $11 WHERE id = $12 RETURNING *',
//             [name, email, password, role, phone_number, birthdate, gender, cpf, created_at, updated_at, is_active, id]
//         );
//         return rows[0];
//     }

//     static async deleteUser(id) {
//         const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
//         return rows[0];
//     }

//     static async getUserCartCount(userId) {
//         const { rows } = await pool.query(`
//             SELECT COUNT(*)
//             FROM shopping_cart_items sci
//             JOIN shopping_carts sc ON sc.id = sci.shopping_cart_id
//             WHERE sc.user_id = $1`, [userId]);
//         return parseInt(rows[0].count, 10);
//     }

// }

// export default UserModel;
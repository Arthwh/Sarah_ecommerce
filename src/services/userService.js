import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

class UserService {
    static async listUsers() {
        return await UserModel.getAllUsers();
    }

    static async getUser(id) {
        return await UserModel.getUserById(id);
    }

    static async getUserByEmail(email) {
        return await UserModel.getUserByEmail(email);
    }

    static async createUser(userData) {
        return await UserModel.createUser(userData);
    }

    static async updateUser(id, userData) {
        return await UserModel.updateUser(id, userData);
    }

    static async deleteUser(id) {
        return await UserModel.deleteUser(id);
    }

    static async login(email, password) {
        const user = await UserModel.getUserByEmail(email);
        if (!user) return null;

        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;

        return user;
    }
}

export default UserService;
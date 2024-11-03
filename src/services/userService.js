import argon2 from 'argon2';
import UserRepository from '../repositories/userRepository.js';

class UserService {
    static async getAllUsersService() {
        try {
            await UserRepository.getAllUsersRepository();
            return { message: "All Users listed successfully" };
        } catch (error) {
            console.error('Error listing users: ' + error.message);
            throw error;
        }
    }

    static async getUserbyIdService(userData) {
        try {
            await UserRepository.getUserByIdRepository(userData.id);
            return { message: "User found successfully" };
        } catch (error) {
            console.error('Error getting user: ' + error.message);
            throw error;
        }
    }

    static async getUserbyEmailService(userData) {
        try {
            await UserRepository.getUserByEmailRepository(userData.email);
            return { message: "User found successfully" };
        } catch (error) {
            console.error('Error getting user: ' + error.message);
            throw error;
        }
    }

    static async createUserService(userData) {
        try {
            userData.password = await argon2.hash(userData.password);
            if (!userData.role) {
                userData.role = 1;
            }

            await UserRepository.createUserRepository(userData);
            return { message: "User created successfully" };
        } catch (error) {
            console.error('Error creating user: ' + error.message);
            throw error;
        }
    }



    static async updateUserService(userData) {
        try {
            await UserRepository.updateUserRepository(userData);
            return { message: "User updated successfully" };
        } catch (error) {
            console.error('Error updating user: ' + error.message);
            throw error;
        }
    }

    static async deleteUserService(userData) {
        try {
            await UserRepository.deleteUserRepository(userData.id);
            return { message: "User deleted successfully" };
        } catch (error) {
            console.error('Error deleting user: ' + error.message);
            throw error;
        }
    }

    static async login(userData) {
        try {
            const { email, password } = userData;
            const user = await UserRepository.getUserByEmailRepository(email);
            const isPasswordValid = await argon2.verify(user.password, password);
            if (!isPasswordValid)
                return { message: "Bad password" };
            const cartCount = await UserRepository.getUserCartCountRepository(user.id);
            return { ...user, cart: { count: cartCount } };
        } catch (error) {
            console.error('Error loggin in user: ' + error.message);
            throw error;
        }
    }

}

export default UserService;

// import UserModel from '../models/userModel.js';
// import bcrypt from 'bcrypt';

// class UserService {
//     static async listUsers() {
//         return await UserModel.getAllUsers();
//     }

//     static async getUser(id) {
//         return await UserModel.getUserById(id);
//     }

//     static async getUserByEmail(email) {
//         return await UserModel.getUserByEmail(email);
//     }

//     static async createUser(userData) {
//         return await UserModel.createUser(userData);
//     }

//     static async updateUser(id, userData) {
//         return await UserModel.updateUser(id, userData);
//     }

//     static async deleteUser(id) {
//         return await UserModel.deleteUser(id);
//     }

//     static async login(email, password) {
//         const user = await UserModel.getUserByEmail(email);
//         if (!user) return null;

//         const match = await bcrypt.compare(password, user.password);
//         if (!match) return null;

//         const cartCount = await UserModel.getUserCartCount(user.id);

//         return { ...user, cart: { count: cartCount } };
//     }
// }

// export default UserService;
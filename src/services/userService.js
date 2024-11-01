import argon2 from 'argon2';
import { createUserRepository, updateUserRepository, getAllUsersRepository, getUserByIdRepository, getUserByEmailRepository, } from '../repositories/userRepository.js';

export async function getAllUsersService() {
    try {
        await getAllUsersRepository();
        return { message: "All Users listed successfully" };
    } catch (error) {
        console.error('Error listing users: ' + error.message);
        throw error;
    }
}

export async function getUserbyIdService(userData) {
    try {
        await getUserByIdRepository(userData.id);
        return { message: "User found successfully" };
    } catch (error) {
        console.error('Error getting user: ' + error.message);
        throw error;
    }
}

export async function getUserbyEmailService(userData) {
    try {
        await getUserByEmailRepository(userData.email);
        return { message: "User found successfully" };
    } catch (error) {
        console.error('Error getting user: ' + error.message);
        throw error;
    }
}

export async function createUserService(userData) {
    try {
        userData.password = await argon2.hash(userData.password);
        await createUserRepository(userData);
        return { message: "User created successfully" };
    } catch (error) {
        console.error('Error creating user: ' + error.message);
        throw error;
    }
}

export async function updateUserService(userData) {
    try {
        await updateUserRepository(userData);
        return { message: "User updated successfully" };
    } catch (error) {
        console.error('Error updating user: ' + error.message);
        throw error;
    }
}

export async function deleteUserService(userData) {
    try {
        await deleteUserRepository(userData.id);
        return { message: "User deleted successfully" };
    } catch (error) {
        console.error('Error deleted user: ' + error.message);
        throw error;
    }
}

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
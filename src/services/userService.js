import argon2 from 'argon2';
import UserRepository from '../repositories/userRepository.js';
import { logAction } from './logsService.js'

class UserService {
    static async getAllUsersService() {
        try {
            return await UserRepository.getAllUsersRepository();
        } catch (error) {
            console.error('Error listing users: ' + error.message);
            throw error;
        }
    }

    static async getUserbyIdService(id) {
        try {
            return await UserRepository.getUserByIdRepository(id);
        } catch (error) {
            console.error('Error getting user: ' + error.message);
            throw error;
        }
    }

    static async getUserbyEmailService(email) {
        try {
            return await UserRepository.getUserByEmailRepository(email);
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
            if (UserRepository.checkIfEmailExists(userData.email)) {
                const error = new Error('E-mail already exists');
                console.error(error.message);
                throw error;
            }
            const userId = await UserRepository.createUserRepository(userData);
            const message = "User created successfully";
            logAction(req, 'user-creation', { status: 'success', details: message }, userId);
            return { message: message };
        } catch (error) {
            console.error('Error creating user: ' + error.message);
            logAction(req, 'user-creation', { status: 'error', details: error.message });
            throw error;
        }
    }

    static async updateUserService(id, userData) {
        try {
            userData.password = await argon2.hash(userData.password);
            if (!userData.role) {
                userData.role = 1;
            }

            await UserRepository.updateUserRepository(id, userData);
            return { message: "User updated successfully" };
        } catch (error) {
            console.error('Error updating user: ' + error.message);
            throw error;
        }
    }

    static async deleteUserService(id) {
        try {
            await UserRepository.deleteUserRepository(id);
            return { message: "User deleted successfully" };
        } catch (error) {
            console.error('Error deleting user: ' + error);
            throw error;
        }
    }

    static async login(userData, userIP, userAgent) {
        try {
            const { email, password } = userData;
            const user = await UserRepository.getUserByEmailRepository(email);
            const isPasswordValid = await argon2.verify(user.password, password);
            if (!isPasswordValid) {
                logAction(userIP, userAgent, 'user-login', { status: 'error', details: 'Password incorrect.' }, user.id);
                throw Error('Password incorrect.');
            }
            const cartCount = await UserRepository.getUserCartCountRepository(user.id);
            const message = 'User logged successfully';
            logAction(userIP, userAgent, 'user-login', { status: 'success', details: message }, user.id);
            return { user: { ...user, cart: { count: cartCount } }, message: message };
        } catch (error) {
            console.error('Error loggin in user: ' + error);
            if (error.message !== 'Password incorrect.') {
                logAction(req, 'user-login', { status: 'error', details: error.message });
            }
            throw error;
        }
    }

}

export default UserService;
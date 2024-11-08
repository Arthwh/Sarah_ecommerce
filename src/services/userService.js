import argon2 from 'argon2';
import UserRepository from '../repositories/userRepository.js';

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
            await UserRepository.createUserRepository(userData);
            return { message: "User created successfully" };
        } catch (error) {
            console.error('Error creating user: ' + error.message);
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
import argon2 from 'argon2';
import UserRepository from '../repositories/userRepository.js';
import WishlistRepository from '../repositories/wishlistRepository.js';
import OrderService from '../services/orderService.js';
import AddressService from './addressService.js';
import CartService from './cartService.js';

import { logAction } from './logsService.js';

class UserService {
    static async login(userIP, userAgent, userData) {
        try {
            const { email, password } = userData;
            const user = await UserRepository.getUserByEmailRepository(email);
            if (!user) {
                logAction(userIP, userAgent, 'user-login', { status: 'error', details: 'User email not found' }, user.id);
                throw Error('User email not found.');
            }
            const isPasswordValid = await argon2.verify(user.password, password);
            if (!isPasswordValid) {
                logAction(userIP, userAgent, 'user-login', { status: 'error', details: 'Password incorrect' }, user.id);
                throw Error('Password incorrect.');
            }
            const cartCount = await CartService.getUserCartCount(user);
            const message = 'User logged successfully';
            logAction(userIP, userAgent, 'user-login', { status: 'success', details: message }, user.id);
            return { user: { ...user, cart: { count: cartCount } }, message: message };
        } catch (error) {
            console.error('Error loggin in user: ' + error);
            if (error.message !== 'Password incorrect.' && error.message !== 'User email not found') {
                logAction(userIP, userAgent, 'user-login', { status: 'error', details: error.message });
            }
            throw Error('Error loggin in user: ' + error.message);
        }
    }

    static async createUserService(userIP, userAgent, userData) {
        try {
            userData.password = await argon2.hash(userData.password);
            if (!userData.role) {
                userData.role = 1;
            }
            const emailExists = await UserRepository.checkIfEmailExists(userData.email);
            if (emailExists) {
                const error = new Error('E-mail already exists');
                console.error(error.message);
                throw error;
            }
            const userId = await UserRepository.createUserRepository(userData);
            await WishlistRepository.createNewWishlist(userId);
            const message = "User created successfully";
            logAction(userIP, userAgent, 'user-creation', { status: 'success', details: message }, userId);
            return { message: message };
        } catch (error) {
            console.error('Error creating user: ' + error.message);
            logAction(userIP, userAgent, 'user-creation', { status: 'error', details: error.message });
            throw error;
        }
    }

    static async getUserPageSectionData(user, section) {
        try {
            let sectionData = null;
            switch (section) {
                case 'profile':
                    sectionData = await this.getUserProfileData(user);
                    break;
                case 'orders':
                    sectionData = await OrderService.getOrdersByUser(user);
                    break;
                case 'addresses':
                    sectionData = await AddressService.getAddressesByUser(user);
                    break;
            }
            return sectionData;
        } catch (error) {
            console.error('Error getting user page section data: ' + error.message);
            throw error;
        }
    }

    static async getUserProfileData(user) {
        try {
            const userProfileData = await UserRepository.getUserProfileData(user.id);
            return userProfileData;
        } catch (error) {
            console.error('Error getting user profile data: ' + error.message);
            throw error;
        }
    }

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

    static async updateUserService(user, userData) {
        try {
            const { user_name, user_phone_number, user_gender, user_email } = userData;
            if (!user_name || !user_phone_number || !user_gender || !user_email) {
                throw new Error('User data is incomplete');
            }
            await UserRepository.updateUserRepository(user.id, user_name, user_email, user_phone_number, user_gender);
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
}

export default UserService;
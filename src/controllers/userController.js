import UserService from '../services/userService.js';
import ProductService from '../services/productService.js';

class UserController {
    static async getAllUsers(req, res) {
        try {
            res.status(200).send(await UserService.getAllUsersService());
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            res.status(200).send(await UserService.getUserbyIdService(req.params.id));
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async getUserByEmail(req, res) {
        try {
            res.status(200).send(await UserService.getUserbyEmailService(req.params.email));
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async createUser(req, res) {
        try {
            const userData = req.body;
            console.log(userData)
            if (!userData) {
                res.status(400).send({ message: 'Please provide user data' });
            }
            await UserService.createUserService(userData);
            res.status(200).send({ message: 'User created successfully' });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const id = req.params.id;
            const userData = req.body;
            await UserService.updateUserService(id, userData);
            res.status(200).send({ message: 'User updated successfully' });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            await UserService.deleteUserService(req.params.id);
            res.status(200).send({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async login(req, res) {
        try {
            const userData = req.body;
            const user = await UserService.login(userData);
            req.session.user = { id: user.id, public_id: user.public_id, email: user.email, cart: { count: user.cart.count }, role: user.role };
            res.json({ user: { id: user.id, public_id: user.public_id, email: user.email, cart: user.cart, role: user.role } });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Erro ao deslogar');
            }
            res.send('Logout bem-sucedido!');
        });
    }

    static async getUserAccountPage(req, res) {
        try {
            const user = req.session.user;
            if (!user) {
                return res.status(401).send({ message: 'Você precisa estar logado para acessar essa página' });
            }
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();
            res.render('client/userConfig', {
                data: {
                    user: user, page: { categories: categories, displayRegisterModal: true }
                }
            });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async getUserLogged(req, res) {
        try {
            const user = req.session.user;
            if (!user) {
                return res.send({ message: 'Usuário não logado', user: undefined });
            }
            res.send({ message: "Usuário Logado", user: user });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

export default UserController;
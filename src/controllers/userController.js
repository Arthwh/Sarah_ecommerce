import UserService from '../services/userService.js';

class UserController {
    
    static async getAllUsers(request, reply) {
        try {
            await getAllUsersService();
            reply.status(200).send({ message: 'User updated successfully' });
        } catch (error) {
            reply.status(400).send({ message: error.message });
        }
    }
    
    static async getUserById(request, reply) {
        try {
            const userData = request.body;
            await getUserByIdService(userData);
            reply.status(200).send({ message: 'User found successfully' });
        } catch (error) {
            reply.status(400).send({ message: error.message });
        }
    }
    
    static async getUserByEmail(request, reply) {
        try {
            const userData = request.body;
            await getUserByEmailService(userData);
            reply.status(200).send({ message: 'User found successfully' });
        } catch (error) {
            reply.status(400).send({ message: error.message });
        }
    }
    
    static async createUser(request, reply) {
        try {
            const userData = request.body;
            await createUserService(userData);
            reply.status(200).send({ message: 'User created successfully' });
        } catch (error) {
            reply.status(400).send({ message: error.message });
        }
    }

    static async updateUser(request, reply) {
        try {
            const userData = request.body;
            await updateUserService(userData);
            reply.status(200).send({ message: 'User updated successfully' });
        } catch (error) {
            reply.status(400).send({ message: error.message });
        }
    }

    static async deleteUser(request, reply) {
        try {
            const userData = request.body;
            await deleteUserService(userData);
            reply.status(200).send({ message: 'User deleted successfully' });
        } catch (error) {
            reply.status(400).send({ message: error.message });
        }
    }
    
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.login(email, password);
            if (!user) {
                return res.status(401).json({ error: 'Usuário ou senha inválidos' });
            }
            req.session.user = { id: user.id, email: user.email, cart: { count: user.cart.count }, role: user.role };
            res.json({ user: { id: user.id, email: user.email, cart: user.cart, role: user.role } });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao logar' });
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
    
    // static async listUsers(req, res) {
    //     try {
    //         const users = await UserService.listUsers();
    //         res.json(users);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Erro ao listar usuários' });
    //     }
    // }

    // static async getUser(req, res) {
    //     try {
    //         const user = await UserService.getUser(req.params.id);
    //         if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    //         res.json(user);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Erro ao buscar usuário' });
    //     }
    // }

    // static async getUserByEmail(req, res) {
    //     try {
    //         const user = await UserService.getUserByEmail(req.params.email);
    //         if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    //         res.json(user);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Erro ao buscar usuário' });
    //     }
    // }

    

    // static async createUser(req, res) {
    //     try {
    //         const newUser = await UserService.createUser(req.body);
    //         res.status(201).json(newUser);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Erro ao criar usuário' });
    //     }
    // }

    // static async updateUser(req, res) {
    //     try {
    //         const updatedUser = await UserService.updateUser(req.params.id, req.body);
    //         if (!updatedUser) return res.status(404).json({ error: 'Usuário não encontrado' });
    //         res.json(updatedUser);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Erro ao atualizar usuário' });
    //     }
    // }

    // static async deleteUser(req, res) {
    //     try {
    //         const deletedUser = await UserService.deleteUser(req.params.id);
    //         if (!deletedUser) return res.status(404).json({ error: 'Usuário não encontrado' });
    //         res.json({ message: 'Usuário deletado com sucesso' });
    //     } catch (error) {
    //         res.status(500).json({ error: 'Erro ao deletar usuário' });
    //     }
    // }
}

export default UserController;
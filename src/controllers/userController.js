import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt'

class UserController {
    static async listUsers(req, res) {
        try {
            const users = await UserModel.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar usuários' });
        }
    }

    static async getUser(req, res) {
        try {
            const user = await UserModel.getUserById(req.params.id);
            if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    }

    static async getUserByEmail(req, res) {
        console.log('Teste1')
        try {
            const user = await UserModel.getUserByEmail(req.params.email);
            console.log(user.password)
            if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    }

    static async createUser(req, res) {
        try {
            const { name, email, password, role = 1, phone_number_1, phone_number_2, birthdate, gender, cpf, created_at, updated_at, is_active } = req.body;
            const newUser = await UserModel.createUser({ name, email, password, role, phone_number_1, phone_number_2, birthdate, gender, cpf, created_at, updated_at, is_active });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    }

    static async updateUser(req, res) {
        try {
            const { name, email, password, role, phone_number_1, phone_number_2, birthdate, gender, cpf, created_at, updated_at, is_active } = req.body;
            const updatedUser = await UserModel.updateUser(req.params.id, { name, email, password, role, phone_number_1, phone_number_2, birthdate, gender, cpf, created_at, updated_at, is_active });
            if (!updatedUser) return res.status(404).json({ error: 'Usuário não encontrado' });
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
    }

    static async deleteUser(req, res) {
        try {
            const deletedUser = await UserModel.deleteUser(req.params.id);
            if (!deletedUser) return res.status(404).json({ error: 'Usuário não encontrado' });
            res.json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            console.log(email);
            console.log(password)
            const user = { id: 1, email: email };
            req.session.user = { id: user.id, email: user.email };
            return res.status(200).json({
                message: "Sucesso!", user: {
                    id: user.id, email: user.email
                }
            })
            // const user = await UserModel.getUserByEmail(email);
            // if (!user) {
            //     return res.status(401).send('Usuário não encontrado');
            // }
            // const match = await bcrypt.compare(password, user.password);
            // if (match) {
            //     // Se a senha estiver correta, armazena o usuário na sessão
            //     req.session.user = { id: user.id, email: user.email };
            //     return res.redirect(req.get('referer') || '/');
            // } else {
            //     return res.status(401).send('Usuário ou senha inválidos');
            // }
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
}

export default UserController;
import express from 'express';
import { checkAuth } from "../middlewares/auth.js";
import UserController from '../controllers/userController.js';

const router = express.Router();

router.post('/login', UserController.login);
router.post('/logout', checkAuth, UserController.logout);
router.get('/users', checkAuth, UserController.listUsers);
router.get('/users/:id', checkAuth, UserController.getUser);
router.get('/users/email/:email', checkAuth, UserController.getUserByEmail);
router.post('/users', UserController.createUser);
router.put('/users/:id', checkAuth, UserController.updateUser);
router.delete('/users/:id', checkAuth, UserController.deleteUser);

export default router;
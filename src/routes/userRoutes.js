import express from 'express';
import { checkAuth } from '../middlewares/auth.js';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.get('/users', checkAuth, UserController.getAllUsers);
router.get('/users/:id', checkAuth, UserController.getUserById);
router.put('/users/:id', checkAuth, UserController.updateUser);
router.delete('/users/:id', checkAuth, UserController.deleteUser);
router.get('/users/email/:email', checkAuth, UserController.getUserByEmail);
router.post('/api/register', checkAuth, UserController.createUser);

//Views
router.get('/account', checkAuth, UserController.getUserAccountPage);

export default router;
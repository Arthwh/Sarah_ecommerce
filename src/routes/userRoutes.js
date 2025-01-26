import express from 'express';
import { checkAuth } from '../middlewares/auth.js';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.get('/users', checkAuth, UserController.getAllUsers);
router.get('/users/:id', checkAuth, UserController.getUserById);
router.put('/api/users', checkAuth, UserController.updateUser);
router.delete('/users/:id', checkAuth, UserController.deleteUser);
router.get('/users/email/:email', checkAuth, UserController.getUserByEmail);
router.post('/api/register', UserController.createUser);

//Views
router.get('/account', checkAuth, UserController.getUserAccountPage);
router.get('/account/orders/:orderId', checkAuth, UserController.getOrderDetailsPage);
router.get('/account/:section', checkAuth, UserController.getUserAccountPage);
router.get('/api/user', checkAuth, UserController.getUserProfileComponent)

export default router;
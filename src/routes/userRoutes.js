import express from 'express';
import { checkAuth } from '../middlewares/auth.js';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.post('/api/login', UserController.login); //
router.post('/api/logout',  checkAuth, UserController.logout); //
router.get('/users', checkAuth, UserController.getAllUsers); //
router.get('/users/:id', checkAuth, UserController.getUserById); //
router.get('/users/email/:email', checkAuth, UserController.getUserByEmail); //
router.post('/api/register', UserController.createUser); //
router.put('/users/:id', checkAuth, UserController.updateUser); //
router.delete('/users/:id', checkAuth, UserController.deleteUser); //
router.get('/session-debug', (req, res) => {
    res.status(200).json({ data: req.session.user });
});

export default router;
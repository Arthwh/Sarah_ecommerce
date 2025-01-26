import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.post('/api/login', UserController.login); 
router.post('/api/logout', UserController.logout); 
router.get('/api/user/check-logged', UserController.getUserLogged);

export default router;
import express from 'express';
import AdminController from '../controllers/adminController.js';

const router = express.Router();

router.get('/admin');

export default router;
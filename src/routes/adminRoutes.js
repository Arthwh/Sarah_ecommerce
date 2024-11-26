import express from 'express';
import { isAdmin } from '../middlewares/auth.js';

import AdminController from '../controllers/adminController.js';

const router = express.Router();

router.get('/admin', isAdmin, AdminController.getAdminPage);

export default router;
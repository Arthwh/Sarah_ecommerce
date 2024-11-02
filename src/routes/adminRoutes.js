import express from 'express';
import upload from '../config/multerConfig.js'
import AdminController from '../controllers/adminController.js';
import ProductController from '../controllers/productController.js';
import { isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/admin', isAdmin, AdminController.getAdminPage);
router.get('/api/admin/products/categories', ProductController.getCategories)
router.post('/api/admin/products/register', upload.array("variantImages"), ProductController.createProduct)

export default router;
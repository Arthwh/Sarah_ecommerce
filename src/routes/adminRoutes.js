import express from 'express';
import { uploadBanner, uploadProduct } from '../config/multerConfig.js'
import AdminController from '../controllers/adminController.js';
import ProductController from '../controllers/productController.js';
import { isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/admin', isAdmin, AdminController.getAdminPage);
router.get('/api/admin/products/categories', isAdmin, ProductController.getCategories)
router.post('/api/admin/products/register', isAdmin, uploadProduct.array("variantImages"), ProductController.createProduct)
router.post('/api/admin/landingPage/save', isAdmin, uploadBanner.any("bannerImages"), AdminController.saveLangingPage)

export default router;
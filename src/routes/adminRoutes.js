import express from 'express';
import { uploadBanner, uploadProduct } from '../config/multerConfig.js'
import AdminController from '../controllers/adminController.js';
import ProductController from '../controllers/productController.js';
import { isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/admin', isAdmin, AdminController.getAdminPage);
router.post('/api/admin/products/register', isAdmin, uploadProduct.array("variantImages"), ProductController.createProduct);
router.put('/api/admin/products/:id', isAdmin, ProductController.updateProduct);
router.delete('/api/admin/products/:id', isAdmin, ProductController.deleteProduct);
router.get('/landing-page/edit', isAdmin, ProductController.getLandingPageForEdit);
router.post('/api/admin/landingPage/save', isAdmin, uploadBanner.any("bannerImages"), AdminController.saveLangingPage);

export default router;
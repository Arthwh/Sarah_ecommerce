import express from 'express';
import ProductController from '../controllers/productController.js';
import { isAdmin, checkAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', ProductController.getLandingPage);
router.get('/api/products/updateProductVariant/:sku', ProductController.getProductVariantData);
router.get('/api/products/categories/subcategories', ProductController.getCategoriesAndSubcategories);
router.get('/api/products/brands', ProductController.getBrands);
router.get('/api/products/colors', ProductController.getProductColors);
router.get('/p/:id', ProductController.getSpecificProduct);
router.get('/c/:category/:subcategory', ProductController.listProductsByCategoryOrSubcategory);
router.get('/c/:category', ProductController.listProductsByCategoryOrSubcategory);

export default router;
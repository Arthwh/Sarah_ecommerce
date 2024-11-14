import express from 'express';
import ProductController from '../controllers/productController.js';
import { isAdmin, checkAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', ProductController.getLandingPage);
router.get('/landing-page/edit', isAdmin, ProductController.getLandingPageForEdit)
router.get('/products/:id', ProductController.getSpecificProduct);
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);
router.get('/api/products/updateProductVariant/:id', ProductController.getProductVariantData);
router.get('/api/products/categories/subcategories', ProductController.getCategoriesAndSubcategories);
router.get('/api/products/brands', ProductController.getBrands);
router.get('/:category/:subcategory', ProductController.listProductsBySubcategory);
router.get('/:category', ProductController.listProductsByCategory);

export default router;
import express from 'express';
import ProductController from '../controllers/productController.js';
import { isAdmin, checkAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', ProductController.getLandingPage);
router.get('/landing-page/edit', isAdmin, ProductController.getLandingPageForEdit)
router.get('/products', ProductController.listProducts);
router.get('/products/:id', ProductController.getSpecificProduct);
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);
router.get('/api/products/updateProductVariant/:id', ProductController.getProductVariantData);
router.get('/api/products/categories/subcategories', ProductController.getCategoriesAndSubcategories);

export default router;
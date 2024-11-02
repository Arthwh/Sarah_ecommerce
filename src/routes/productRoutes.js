import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();

router.get('/', ProductController.getLandingPage);
router.get('/products', ProductController.listProducts);
router.get('/products/:id', ProductController.getSpecificProduct);
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);
router.get('/api/products/updateProductVariant/:id', ProductController.getProductVariantData);

export default router;
import express from 'express';
import ProductController from '../controllers/productController.js';
import { getBreadcrumbs } from '../middlewares/breadcrumb.js'
import upload from '../config/multerConfig.js'

const router = express.Router();

router.get('/', ProductController.getLangingPage);
router.get('/products', ProductController.listProducts);
router.get('/products/:id', ProductController.getProduct);
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);
router.get("/api/products/updateProductVariant/:id", ProductController.updateProductVariantData)
router.get("/admin", ProductController.getAdminPage)
router.get('/api/admin/products/categories', ProductController.getCategories)
router.post('/api/admin/products/register', upload.array("variantImages"), ProductController.createNewProduct)

export default router;
import express from 'express';
import { isAdmin } from '../middlewares/auth.js';
import { uploadProduct } from '../config/multerConfig.js'

import ProductController from '../controllers/productController.js';

const router = express.Router();

router.get('/api/products/variant/:sku', ProductController.getProductVariantData);
router.get('/api/products/categories/subcategories', ProductController.getCategoriesAndSubcategories);
router.get('/api/products/brands', ProductController.getBrands);
router.get('/api/products/colors', ProductController.getProductColors);

//Admin
router.post('/api/admin/products/register', isAdmin, uploadProduct.array("variantImages"), ProductController.createProduct);
router.put('/api/admin/products/:id', isAdmin, ProductController.updateProduct);
router.delete('/api/admin/products/:id', isAdmin, ProductController.deleteProduct);

//Views
router.get('/p/:id', ProductController.getSpecificProduct);
router.get('/c/:category/:subcategory', ProductController.listProductsByCategoryOrSubcategory);
router.get('/c/:category', ProductController.listProductsByCategoryOrSubcategory);


export default router;  
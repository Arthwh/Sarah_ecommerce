import express from 'express'
import { getProductInfo, updateProductVariantData, getProducts } from "../controllers/productController.js"

const router = express.Router();

router.get("/", getProductInfo)
router.get('/products', getProducts)
router.get("/api/products/updateProductVariant/:id", updateProductVariantData)


export default router
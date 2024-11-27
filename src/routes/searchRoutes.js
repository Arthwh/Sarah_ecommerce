import express from 'express';
import SearchController from '../controllers/searchController.js';

const router = express.Router();

router.get('/search', SearchController.searchProducts);

export default router;
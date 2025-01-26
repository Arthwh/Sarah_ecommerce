import express from 'express';
import { isAdmin } from '../middlewares/auth.js';
import OfferController from '../controllers/offerController.js';

const router = express.Router();

router.post('/offers', isAdmin, OfferController.createOffer);
router.put('/offers/:offerId', isAdmin, OfferController.updateOffer);
router.delete('/offers/:offerId', isAdmin, OfferController.deleteOffer);
router.get('/offers/active', OfferController.getActiveOffers);

export default router;
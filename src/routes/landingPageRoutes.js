import express from 'express';
import { isAdmin } from '../middlewares/auth.js';
import { uploadBanner } from '../config/multerConfig.js'

import LandingPageController from '../controllers/landingPageController.js';

const router = express.Router();

router.get('/', LandingPageController.getLandingPage);
router.get('/landing-page/edit', isAdmin, LandingPageController.getLandingPage);
router.post('/api/admin/landing-page/save', isAdmin, uploadBanner.any("bannerImages"), LandingPageController.saveLangingPage);
router.post('/api/landing-page/section', isAdmin, LandingPageController.getSectionElement);

export default router;
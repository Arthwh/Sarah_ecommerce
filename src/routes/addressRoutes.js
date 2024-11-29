import express from 'express';
import { checkAuth } from '../middlewares/auth.js';
import AddressController from '../controllers/addressController.js';

const router = express.Router();

router.post('/addresses', checkAuth, AddressController.addAddress);
router.put('/addresses/:addressId', checkAuth, AddressController.updateAddress);
router.delete('/addresses/:addressId', checkAuth, AddressController.deleteAddress);
router.get('/addresses', checkAuth, AddressController.getAddressesByUser);

export default router;
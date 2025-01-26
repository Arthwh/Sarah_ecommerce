import express from 'express';
import { checkAuth } from '../middlewares/auth.js';
import AddressController from '../controllers/addressController.js';

const router = express.Router();

router.post('/api/addresses/add', checkAuth, AddressController.addAddress);
router.put('/api/addresses/update/:addressId', checkAuth, AddressController.updateAddress);
router.delete('/api/addresses/delete/:addressId', checkAuth, AddressController.deleteAddress);
router.get('/api/addresses/get-address-by-id/:id', checkAuth, AddressController.getAddressById)
router.get('/api/addresses/get-address-by-user-id', checkAuth, AddressController.getAddressesByUser);
router.post('/addresses/:addressId/assign', checkAuth, AddressController.assignAddressToUser);
router.delete('/addresses/:addressId/remove', checkAuth, AddressController.removeAddressFromUser);
router.get('/api/addresses/country', checkAuth, AddressController.getAllCountries)
router.get('/api/addresses/country/:id/states', checkAuth, AddressController.getAllStatesFromCountryId);

router.get('/api/addresses', checkAuth, AddressController.getUserAddressesComponent)

export default router;
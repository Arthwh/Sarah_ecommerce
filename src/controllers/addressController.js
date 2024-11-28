import AddressService from '../services/addressService.js';

class AddressController {
    static async addAddress(req, res) {
        const cityId = req.body.city_id;
        const addressData = req.body;

        try {
            const newAddress = await AddressService.addAddress(cityId, addressData);
            res.status(201).json(newAddress);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao adicionar endereço.' });
        }
    }

    static async updateAddress(req, res) {
        const { addressId } = req.params;
        const addressData = req.body;

        try {
            const updatedAddress = await AddressService.updateAddress(addressId, addressData);
            res.status(200).json(updatedAddress);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar endereço.' });
        }
    }

    static async deleteAddress(req, res) {
        const { addressId } = req.params;

        try {
            const deletedAddress = await AddressService.deleteAddress(addressId);
            res.status(200).json(deletedAddress);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao excluir endereço.' });
        }
    }

    static async getAddressesByUser(req, res) {
        const user = req.session.user;
        const userId = user.id;

        try {
            const addresses = await AddressService.getAddressesByUser(userId);
            res.status(200).json(addresses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter endereços.' });
        }
    }

    static async assignAddressToUser(req, res) {
        const { addressId } = req.params;
        const user = req.session.user;
        const userId = user.id;

        try {
            const assignment = await AddressService.assignAddressToUser(userId, addressId);
            res.status(200).json(assignment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atribuir endereço ao usuário.' });
        }
    }

    static async removeAddressFromUser(req, res) {
        const { addressId } = req.params;
        const user = req.session.user;
        const userId = user.id;

        try {
            const removal = await AddressService.removeAddressFromUser(userId, addressId);
            res.status(200).json(removal);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao remover endereço do usuário.' });
        }
    }
}

export default AddressController;

import AddressService from '../services/addressService.js';

class AddressController {
    static async getUserAddressesComponent(req, res) {
        try {
            const user = req.session.user;
            const userAddresses = await AddressService.getAddressesByUser(user);
            res.render("client/partials/userPageComponents/addresses", { sectionData: userAddresses });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter endereços: ' + error.message });
        }
    }

    static async getAllCountries(req, res) {
        try {
            const countries = await AddressService.getAllCountries();
            res.status(200).json(countries);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter paises: ' + error.message });
        }
    }

    static async getAllStatesFromCountryId(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: 'Id do pais não informado' });
            }
            const states = await AddressService.getAllStatesFromCountryId(id);
            res.status(200).json(states);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter estados: ' + error.message });
        }
    }

    static async addAddress(req, res) {
        try {
            const user = req.session.user;
            const addressData = req.body;
            if (!addressData) {
                return res.status(400).json({ message: 'Dados do endereço não informados' });
            }
            await AddressService.addAddress(user, addressData);
            res.status(201).json({ message: 'Endereço adicionado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao adicionar endereço.' });
        }
    }

    static async updateAddress(req, res) {
        try {
            const { addressId } = req.params;
            const addressData = req.body;
            if (!addressData) {
                return res.status(400).json({ message: 'Dados do endereço não informados' });
            }
            await AddressService.updateAddress(addressId, addressData);
            res.status(201).json({ message: 'Endereço editado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar endereço.' });
        }
    }

    static async deleteAddress(req, res) {
        try {
            const { addressId } = req.params;
            const deletedAddress = await AddressService.deleteAddress(addressId);
            res.status(200).json(deletedAddress);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao excluir endereço.' });
        }
    }

    static async getAddressById(req, res) {
        try {
            const addressId = req.params.id;
            const user = req.session.user;
            if (!addressId) {
                return res.status(400).json({ message: 'Id do endereço não informado' });
            }
            const addressData = await AddressService.getAddressById(user, addressId);
            res.status(200).json(addressData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar endereço.' });
        }
    }

    static async getAddressesByUser(req, res) {
        try {
            const userId = req.session.user;
            const addresses = await AddressService.getAddressesByUser(userId);
            res.status(200).json(addresses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter endereços.' });
        }
    }

    static async assignAddressToUser(req, res) {
        try {
            const { addressId } = req.params;
            const user = req.session.user;
            const userId = user.id;
            const assignment = await AddressService.assignAddressToUser(userId, addressId);
            res.status(200).json(assignment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atribuir endereço ao usuário.' });
        }
    }

    static async removeAddressFromUser(req, res) {
        try {
            const { addressId } = req.params;
            const user = req.session.user;
            const userId = user.id;
            const removal = await AddressService.removeAddressFromUser(userId, addressId);
            res.status(200).json(removal);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao remover endereço do usuário.' });
        }
    }
}

export default AddressController;

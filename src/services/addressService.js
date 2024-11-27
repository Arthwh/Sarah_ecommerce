const AddressRepository = require('../repositories/addressRepository');

class AddressService {
    static async addAddress(cityId, addressData) {
        try {
            const newAddress = await AddressRepository.addAddress(cityId, addressData);
            return newAddress;
        } catch (error) {
            console.error('Erro ao adicionar endereço:', error);
            throw new Error('Erro ao adicionar endereço.');
        }
    }

    static async updateAddress(addressId, addressData) {
        try {
            const updatedAddress = await AddressRepository.updateAddress(addressId, addressData);
            return updatedAddress;
        } catch (error) {
            console.error('Erro ao atualizar endereço:', error);
            throw Error('Erro ao atualizar endereço.');
        }
    }

    static async deleteAddress(addressId) {
        try {
            const deletedAddress = await AddressRepository.deleteAddress(addressId);
            return deletedAddress;
        } catch (error) {
            console.error('Erro ao excluir endereço:', error);
            throw Error('Erro ao excluir endereço.');
        }
    }

    static async getAddressesByUser(userId) {
        try {
            const addresses = await AddressRepository.getAddressesByUser(userId);
            return addresses;
        } catch (error) {
            console.error('Erro ao obter endereços:', error);
            throw Error('Erro ao obter endereços.');
        }
    }

    static async assignAddressToUser(userId, addressId) {
        try {
            const assignment = await AddressRepository.assignAddressToUser(userId, addressId);
            return assignment;
        } catch (error) {
            console.error('Erro ao atribuir endereço ao usuário:', error);
            throw Error('Erro ao atribuir endereço.');
        }
    }

    static async removeAddressFromUser(userId, addressId) {
        try {
            const removal = await AddressRepository.removeAddressFromUser(userId, addressId);
            return removal;
        } catch (error) {
            console.error('Erro ao remover endereço do usuário:', error);
            throw Error('Erro ao remover endereço.');
        }
    }
}

export default AddressService;
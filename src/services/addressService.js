import AddressRepository from '../repositories/addressRepository.js';

class AddressService {
    static async addAddress(user, addressData) {
        try {
            const { name: address_name, street, number, country: country_id, state: state_id, city, zipCode, complement } = addressData;
            const newAddress = await AddressRepository.addAddress(user.id, address_name, street, number, country_id, state_id, city, zipCode, complement);
            return newAddress;
        } catch (error) {
            console.error('Erro ao adicionar endereço:', error);
            throw new Error('Erro ao adicionar endereço.');
        }
    }

    static async updateAddress(addressId, addressData) {
        try {
            const { name: address_name, street, number, country: country_id, state: state_id, city, zipCode, complement } = addressData;
            const updatedAddress = await AddressRepository.updateAddress(addressId, address_name, street, number, country_id, state_id, city, zipCode, complement);
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

    static async getAddressById(user, addressId) {
        try {
            const addressData = await AddressRepository.getAddressById(user.id, addressId);
            return addressData;
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
            throw new Error('Erro ao buscar endereço.');
        }
    }

    static async getAddressesByUser(user) {
        try {
            const addresses = await AddressRepository.getAddressesByUser(user.id);
            const countries = await this.getAllCountries();
            console.log(countries)
            return { addresses, countries };
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

    static async getAllCountries() {
        try {
            const countries = await AddressRepository.getAllCountries();
            return countries;
        } catch (error) {
            console.error('Erro ao obter países:', error);
            throw Error('Erro ao obter países.');
        }
    }

    static async getAllStatesFromCountryId(id) {
        try {
            const states = await AddressRepository.getAllStatesFromCountryId(id);
            return states;
        } catch (error) {
            console.error('Erro ao obter estados pelo código do país:', error);
            throw Error('Erro ao obter estados pelo código do país' + error);
        }
    }
}

export default AddressService;
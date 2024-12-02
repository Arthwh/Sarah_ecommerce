import OfferRepository from '../repositories/offerRepository.js';

class OfferService {
    static async createOffer(offerData) {
        return await OfferRepository.createOffer(offerData);
    }

    static async updateOffer(offerId, offerData) {
        return await OfferRepository.updateOffer(offerId, offerData);
    }

    static async deleteOffer(offerId) {
        return await OfferRepository.deleteOffer(offerId);
    }

    static async getActiveOffers() {
        return await OfferRepository.getActiveOffers();
    }
}

export default OfferService;
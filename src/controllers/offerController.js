import OfferService from '../services/offerService.js';

class OfferController {
    static async createOffer(req, res) {
        try {
            const offer = await OfferService.createOffer(req.body);
            res.status(201).json(offer);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar oferta" + error.message });
        }
    }

    static async updateOffer(req, res) {
        try {
            const { offerId } = req.params;
            const updatedOffer = await OfferService.updateOffer(offerId, req.body);
            res.status(200).json(updatedOffer);
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar oferta" + error.message });
        }
    }

    static async deleteOffer(req, res) {
        try {
            const { offerId } = req.params;
            const deletedOffer = await OfferService.deleteOffer(offerId);
            res.status(200).json(deletedOffer);
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar oferta" });
        }
    }

    static async getActiveOffers(req, res) {
        try {
            const offers = await OfferService.getActiveOffers();
            res.status(200).json(offers);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar ofertas" });
        }
    }
}

export default OfferController;
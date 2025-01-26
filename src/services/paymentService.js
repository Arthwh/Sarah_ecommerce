import PaymentRepository from "../repositories/paymentRepository.js";

class PaymentService {
    static async createNewPayment(client, user, paymentMethod, creditCardData, order) {
        if (!paymentMethod || (paymentMethod === 'credit-card' && !creditCardData) || !order) {
            throw new Error("Missing required parameters");
        }
        const transaction = await this.createNewTransaction(client, user, creditCardData, paymentMethod, order);
        if (!transaction) {
            throw new Error("Erro ao processar a transação");
        }
        const payment = await PaymentRepository.createPayment(client, transaction, order.id);
        if (!payment) {
            throw new Error("Erro ao registrar o pagamento");
        }
        return payment;
    }

    static async createNewTransaction(client, user, creditCardData, paymentMethod, order) {
        try {
            let transaction = null;
            switch (paymentMethod) {
                case "credit-card":
                    transaction = await PaymentRepository.createCreditCardTransaction(client, user, creditCardData, order.total_price, paymentMethod);
                    break;
                case "bank-slip":
                    transaction = await PaymentRepository.createBankSlipTransaction(client, user, order.total_price, paymentMethod);
                    break;
                case "pix":
                    transaction = await PaymentRepository.createPixTransaction(client, user, order.total_price, paymentMethod);
                    break;
                default:
                    throw new Error("Método de pagamento inválido");
            }
            return transaction;
        } catch (error) {
            console.error("Erro ao criar transação:", error);
            throw error;
        }
    }
}

export default PaymentService;
class PaymentRepository {
    static async fakeTransaction(user, creditCardData, orderTotalPrice, paymentMethod) {
        // Simula o processo de transação com dados fictícios
        const transactionId = `fake-${Date.now()}`;  // Gera um ID único para a transação
        const status = 'SUCCESS';  // Status simulado de transação bem-sucedida
        const paymentDate = new Date().toISOString();  // Data e hora simuladas

        // Cria os dados da transação "fake"
        const transactionData = {
            transactionId: transactionId,
            status: status,
            amount: orderTotalPrice,
            paymentMethod: paymentMethod,
            paymentInstallments: creditCardData?.installments || 1,
            paymentInstallmentsValue: (parseFloat(orderTotalPrice) / (parseInt(creditCardData?.installments) || 1)).toFixed(2),
            paymentDate: paymentDate,
            userId: user.id
        };

        return transactionData;
    }
    static async createCreditCardTransaction(client, user, creditCardData, orderTotalPrice, paymentMethod) {
        try {
            const transaction = await this.fakeTransaction(user, creditCardData, orderTotalPrice, paymentMethod);
            return transaction;
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    static async createBankSlipTransaction(client, user, orderTotalPrice, paymentMethod) {
        try {
            const transaction = await this.fakeTransaction(user, null, orderTotalPrice, paymentMethod);
            return transaction;
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    static async createPixTransaction(client, user, orderTotalPrice, paymentMethod) {
        try {
            const transaction = await this.fakeTransaction(user, null, orderTotalPrice, paymentMethod);
            return transaction;
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    static async createPayment(client, transaction, orderId) {
        try {
            const { rows } = await client.query(`
                    INSERT INTO payments (order_id, payment_method, amount, installments, installments_value, transaction_id)
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
                `, [orderId, transaction.paymentMethod, transaction.amount, transaction.paymentInstallments, transaction.paymentInstallmentsValue, transaction.transactionId]);

            return rows[0];
        } catch (error) {
            console.error(`Error creating payment: ${error}`);
            throw Error(`Error creating payment: ${error.message}`)
        }
    }

    static async getPaymentByOrderId(orderId) {
        try {
            const query = `
            SELECT p.* FROM payments p
            JOIN orders o ON p.id = o.payment_id
            WHERE o.id = $1;
        `;
            const { rows } = await pool.query(query, [orderId]);
            return rows.length ? Payment.mapFromRow(rows[0]) : null;
        } catch (error) {
            console.error(`Error getting order payment: ${error}`);
            throw Error(`Error getting orders payment: ${error.message}`)
        }
    }
}

export default PaymentRepository;
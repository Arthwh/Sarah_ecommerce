function verifyIfCreditCardInputChecked(input) {
    if (input.id === 'payment_method_credit_card_radio') {
        enableCreditCardInfoContainer()
    }
    else {
        disableCreditCardInfoContainer()
    }
}

function disableCreditCardInfoContainer() {
    const creditCardInfoContainer = document.querySelector('.credit-card-info-container');
    if (!creditCardInfoContainer.classList.contains('disabled')) {
        creditCardInfoContainer.classList.add('disabled');
    }
}

function enableCreditCardInfoContainer() {
    const creditCardInfoContainer = document.querySelector('.credit-card-info-container');
    if (creditCardInfoContainer.classList.contains('disabled')) {
        creditCardInfoContainer.classList.remove('disabled');
    }
}

async function toggleAddressSelectModal() {
    const addressSelectModal = document.getElementById('addressSelectModal');
    if (!addressSelectModal) {
        showToast('Modal de edição de endereços não encontrado.', 'error');
        return;
    }

    if (addressSelectModal.classList.contains('disabled')) {
        addressSelectModal.classList.remove('disabled')
    }
    else {
        addressSelectModal.classList.add('disabled')
    }

}
async function addAddress() {
    window.location.href = '/account/addresses';
}

async function changeAddressSelectedData(inputElement) {
    const parentElement = inputElement.parentElement;
    const newAddress = parentElement.dataset.addressId;
    const mainAddressContainer = document.getElementById('address');
    const addressSelected = mainAddressContainer.dataset.addressIdSelected;

    if (addressSelected === newAddress) {
        toggleAddressSelectModal();
        return;
    }

    const addressSelectedData = parentElement.querySelector('div').querySelectorAll('p');
    const mainAddressDataDisplay = document.getElementById('mainAddressDataDisplay');
    const addressSelectModal = document.getElementById('addressSelectModal');

    mainAddressDataDisplay.innerHTML = '';

    addressSelectedData.forEach(p => {
        mainAddressDataDisplay.innerHTML += p.outerHTML;
    });

    mainAddressContainer.dataset.addressIdSelected = newAddress;
    addressSelectModal.dataset.selectedAddress = newAddress;

    toggleAddressSelectModal();
}

async function confirmOrder() {
    try {
        const { method, creditCardData } = await getPaymentData();
        const addressId = await getAddressData();
        const cart = cartData;
        if (!cart) {
            throw new Error('Carrinho vazio.');
        }
        const order = await sendOrderData(method, creditCardData, addressId, cart);
        await clearCart();
        showOrderModal('success', `Pedido ${order.id} criado com sucesso! <br>Acompanhe o pedido na seção de pedidos da conta.`);
    } catch (error) {
        console.error(error);
        showOrderModal('error', 'Houve um erro ao processar o pedido<br>' + error.message);
    }
}

async function sendOrderData(method, creditCardData, addressId, cart) {
    try {
        const response = await fetch('/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                addressId: addressId,
                creditCardData: creditCardData,
                paymentMethod: method,
                cart: cart,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        return response.json();
    } catch (error) {
        console.error(error);
        throw Error(error.message)
    }
}

async function clearCart() {
    try {
        const response = await fetch('/cart/all', {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error('Erro ao limpar carrinho: ', error);
        throw Error(error.message)
    }
}

async function getAddressData() {
    const addressId = document.getElementById('address')?.dataset.addressIdSelected;
    if (!addressId) {
        throw Error('Adicione um endereço válido.')
    }
    return addressId
}

async function getPaymentData() {
    const paymentSection = document.getElementById('paymentSection');
    const paymentSelected = paymentSection.querySelector('input:checked')?.value;
    if (!paymentSelected) {
        throw Error('Selecione uma forma de pagamento');
    }

    switch (paymentSelected) {
        case 'credit-card':
            const creditCardData = await getCreditCardData();
            return { method: paymentSelected, creditCardData: creditCardData };
        case 'bank-slip':
        case 'pix':
            return { method: paymentSelected, creditCardData: null }
        default:
            break;
    }
}

async function getCreditCardData() {
    const creditCardForm = document.getElementById('credit_card_form');
    if (!creditCardForm) {
        throw Error('Informações do cartão de crédito não encontradas.');
    }

    const number = document.getElementById('credit_card_number').value;
    const name = document.getElementById('credit_card_name').value;
    const month = document.getElementById('credit_card_expiration_month').value;
    const year = document.getElementById('credit_card_expiration_year').value;
    const cvv = document.getElementById('credit_card_cvv').value;
    const installments = document.getElementById('credit_card_installments').value

    if (!number || !name || !month || !year || !cvv || !installments) {
        throw Error('Preencha todos os campos do cartão de crédito.');
    }

    if (!validateCardNumber(number)) {
        throw Error('Número do cartão inválido.');
    }

    if (!validateCardName(name)) {
        throw Error('Nome no cartão inválido.');
    }

    if (!validateExpirationDate(month, year)) {
        throw Error('Data de expiração inválida.');
    }

    if (!validateCVV(cvv)) {
        throw Error('CVV inválido.');
    }

    if (!installments) {
        throw Error('Número de parcelas inválido.');
    }

    return {
        cardNumber: number,
        cardName: name,
        expirationMonth: month,
        expirationYear: year,
        cvv: cvv,
        installments: installments
    };
}

function validateCardNumber(cardNumber) {
    // Algoritmo de Luhn
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}


function validateExpirationDate(month, year) {
    const currentDate = new Date();
    const selectedDate = new Date(year, month - 1);
    return selectedDate >= currentDate;
}


function validateCVV(cvv) {
    return /^[0-9]{3,4}$/.test(cvv);
}

function validateCardName(name) {
    return /^[a-zA-Z\s]+$/.test(name) && name.trim().length > 0;
}

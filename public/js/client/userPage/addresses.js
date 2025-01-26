async function start() {
    await renderCountries();
}

function toggleAddressModal(mode) {
    const addressesModal = document.getElementById('edit-address-addresses-modal');
    const addressesForm = document.getElementById('edit-address-form');
    const saveAddressButton = document.getElementById('saveAddressButton');

    if (!addressesModal) {
        showCentralModal('Endereços', 'Houve um erro ao carregar o formulário');
        return;
    }

    const header = addressesModal.querySelector('h2');
    if (mode === 'edit' && header) {
        header.innerText = 'Editar endereço';
        addressId = document.getElementById('address-id').value;
        saveAddressButton.onclick = () => sendEditedAddress(addressId);
    } else if (mode === 'add' && header) {
        header.innerText = 'Adicionar endereço';
        saveAddressButton.onclick = () => sendNewAddress();
    }
    if (addressesModal.classList.contains('hidden')) {
        addressesModal.classList.remove('hidden');
    }
    else {
        addressesModal.classList.add('hidden');
        addressesForm.reset();
    }
}

async function sendNewAddress() {
    try {
        if (!validateAddressForm()) {
            return;
        }
        const form = document.getElementById('edit-address-form');
        const formData = new FormData(form);
        const jsonData = {};

        formData.forEach((value, key) => {
            jsonData[key] = value;
        });
        await fetch('/api/addresses/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
            });

        showToast('Endereço adicionado com sucesso!', 'success');
        toggleAddressModal();
        loadUserAddressesComponent();
    } catch (error) {
        console.error('Erro ao adicionar novo endereço:', error);
        showToast('Erro ao adicionar novo endereço:' + error, 'error');
    }
}

function validateAddressForm() {
    const form = document.getElementById('edit-address-form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showToast('Preencha todos os campos.', 'error');
        } else if (input.id === 'zipCode' && !/^\d{5}\d{3}$/.test(input.value)) {
            // Validação específica para o CEP (formato 00000-000 ou 00000000)
            isValid = false;
            showToast('CEP inválido. Use o formato 00000000.', 'error');
        }
    });

    return isValid;
}

async function setAddressDataIntoForm(addressData) {
    if (!addressData) {
        throw new Error('Dados faltantes.')
    }
    const addressesForm = document.getElementById('edit-address-form');
    const addressId = addressesForm.querySelector('#address-id');
    addressId.value = addressData.id
    const nameField = addressesForm.querySelector('#name');
    nameField.value = addressData.name
    const streetField = addressesForm.querySelector('#street');
    streetField.value = addressData.street
    const numberField = addressesForm.querySelector('#number');
    numberField.value = addressData.number
    const complementField = addressesForm.querySelector('#complement');
    complementField.value = addressData.complement
    const cityField = addressesForm.querySelector('#city');
    cityField.value = addressData.city;
    const zipCodeField = addressesForm.querySelector('#zipCode');
    zipCodeField.value = addressData.zipcode;
    const countryField = addressesForm.querySelector('#country');
    countryField.value = addressData.country_id;
    const stateField = addressesForm.querySelector('#state');
    await renderStatesByCountry()
    stateField.value = addressData.state_id
}

async function editAddress(addressId) {
    try {
        if (!addressId) {
            throw new Error('Endereço não encontrado.');
        }
        const response = await fetch(`/api/addresses/get-address-by-id/${addressId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            });
        await setAddressDataIntoForm(response);
        toggleAddressModal('edit');
    } catch (error) {
        console.error('Erro ao editar endereço:', error);
        showToast('Erro ao editar endereço:' + error, 'error');
    }
}

async function sendEditedAddress(addressId) {
    try {
        if (!validateAddressForm()) {
            return;
        }
        const form = document.getElementById('edit-address-form');
        const formData = new FormData(form);
        const jsonData = {};

        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        await fetch(`/api/addresses/update/${addressId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
            });

        showToast('Endereço adicionado com sucesso!', 'success');
        toggleAddressModal();
        loadUserAddressesComponent()
    } catch (error) {
        console.error('Erro ao adicionar novo endereço:', error);
        showToast('Erro ao adicionar novo endereço:' + error, 'error');
    }
}

async function deleteAddress(addressId) {
    try {
        if (!addressId) {
            showToast('Selecione um endereço para excluir.', 'error');
            return;
        }
        if (!confirm('Deseja excluir o endereço selecionado?')) {
            return;
        }
        const card = document.querySelector(`.address-card[data-address-id="${addressId}"]`);

        await fetch(`/api/addresses/delete/${addressId}`, {
            method: 'DELETE',
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        });

        showToast('Endereço removido com sucesso!', 'success');
        card.remove();
    } catch (error) {
        console.error(error);
        showToast(error.message, 'error');
        return;
    }
}

async function renderCountries() {
    try {
        const country_select = document.getElementById('country');
        if (!country_select) {
            throw Error('Houve um erro ao carregar os paises')
        }
        const countries = await getCountries();
        for (const country of countries) {
            const element = document.createElement('option');
            element.value = country.country_id;
            element.innerText = (`${country.country_name} (${country.country_abbreviation})`);
            country_select.appendChild(element);
        };

        country_select.addEventListener('change', renderStatesByCountry);
    } catch (error) {
        console.error(error);
        showToast(error.message, 'error');
        return;
    }
}

async function renderStatesByCountry() {
    try {
        const country_selected = document.getElementById('country').value;
        if (!country_selected) {
            throw Error('Selecione um pais')
        }
        const state_select = document.getElementById('state');
        if (!state_select) {
            throw Error('Houve um erro ao carregar os estados')
        }
        const states = await getStatesByCountryId(country_selected);
        for (const state of states) {
            const element = document.createElement('option');
            element.value = state.state_id;
            element.innerText = (`${state.state_name} (${state.state_abbreviation})`);
            state_select.appendChild(element);
        };
    } catch (error) {
        console.error(error);
        showToast(error.message, 'error');
        return;
    }
}

async function getCountries() {
    try {
        const response = await fetch('/api/addresses/country')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            });
        return response;
    } catch (error) {
        throw Error('Erro ao obter países');
    }
}

async function getStatesByCountryId(id) {
    try {
        const response = await fetch(`/api/addresses/country/${id}/states`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            });
        return response;
    } catch (error) {
        throw Error('Erro ao obter estados');
    }
}
const userProfile = document.getElementById('userProfile');
const userOrders = document.getElementById('userOrders');
const userAddresses = document.getElementById('userAddresses');
const userPaymentMethods = document.getElementById('userPaymentMethods');
const userNotifications = document.getElementById('userNotifications');
const userSecurity = document.getElementById('userSecurity');

const userContentComponent = document.getElementById('configContent');

document.addEventListener('DOMContentLoaded', () => {
    userProfile?.addEventListener('click', loadUserProfileComponent);
    userOrders?.addEventListener('click', loadUserOrdersComponent);
    userAddresses?.addEventListener('click', loadUserAddressesComponent);
});

function updateUrl(newPath) {
    if (typeof newPath === 'string') {
        const baseUrl = window.location.origin + '/account';
        const newUrl = `${baseUrl}${newPath}`;
        history.pushState(null, '', newUrl);
    } else {
        console.error('O novo caminho deve ser uma string.');
    }
}

async function loadUserProfileComponent() {
    try {
        if (!userContentComponent) {
            throw new Error('User content component not found');
        }
        const response = await fetch('/api/user')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.message);
                }
                return response.text();
            });

        userContentComponent.innerHTML = response;
        updateUrl('/profile')
    } catch (error) {
        console.error('Ocorreu um erro ao carregar os dados do usuário: ' + error);
        showToast('Ocorreu um erro ao carregar os dados do usuário: ' + error, 'error');
    }
}

async function loadUserOrdersComponent() {
    try {
        if (!userContentComponent) {
            throw new Error('User content component not found');
        }
        const response = await fetch('/api/orders')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.message);
                }
                return response.text();
            });

        userContentComponent.innerHTML = response;
        updateUrl('/orders')
    } catch (error) {
        console.error('Ocorreu um erro ao carregar os pedidos do usuário');
        showToast('Ocorreu um erro ao carregar os pedidos do usuário', 'error');
    }
}

async function loadUserAddressesComponent() {
    try {
        if (!userContentComponent) {
            throw new Error('User content component not found');
        }
        const response = await fetch('/api/addresses')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.message);
                }
                return response.text();
            });

        userContentComponent.innerHTML = response;
        updateUrl('/addresses');
        start();
    } catch (error) {
        console.error('Ocorreu um erro ao carregar os endereços do usuário: ' + error);
        showToast('Ocorreu um erro ao carregar os endereços do usuário: ' + error.message, 'error');
    }
}
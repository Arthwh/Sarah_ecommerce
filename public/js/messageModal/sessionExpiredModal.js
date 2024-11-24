function showSessionExpiredModal() {
    if (document.getElementById('sessionExpiredModal')) {
        return;
    }

    const overlayContainer = document.createElement('div');
    overlayContainer.classList.add('modal-overlay');
    const modal = document.createElement('div');
    modal.id = 'sessionExpiredModal';
    modal.classList.add('session-expired-modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('session-expired-modal-content');

    const message = document.createElement('p');
    message.innerHTML = 'Sua sessão expirou.<br> Por favor, faça login novamente.';
    modalContent.appendChild(message);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('modal-buttons');

    const loginButton = document.createElement('button');
    loginButton.id = 'loginButton';
    loginButton.classList.add('action-btn-contrast');
    loginButton.textContent = 'Fazer Login';
    buttonsContainer.appendChild(loginButton);

    const homeButton = document.createElement('button');
    homeButton.id = 'homeButton';
    homeButton.classList.add('action-btn-contrast');
    homeButton.textContent = 'Voltar para a Página Inicial';
    buttonsContainer.appendChild(homeButton);

    modalContent.appendChild(buttonsContainer);
    modal.appendChild(modalContent);
    overlayContainer.appendChild(modal);
    document.body.appendChild(overlayContainer);

    loginButton.onclick = () => {
        toggleLoginModal(false);
        overlayContainer.remove();
    };

    homeButton.onclick = function () {
        window.location.href = '/';
    };
}
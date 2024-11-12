function showLoginNeddedModal() {
    const existentModal = document.getElementById('loginNeddedModal');
    if (existentModal) {
        existentModal.remove();
    };

    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');
    modal.id = 'loginNeddedModal';

    modal.innerHTML = `
        <div class="modal-content">
            <h2 class="modal-title">Usuário não logado</h2>
            <p class="modal-message">Você precisa estar logado para acessar esse recurso.</p>
            <button class="modal-login">Fazer Login</button>
            <button class="modal-close">Fechar</button>
        </div>
    `;

    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    modal.querySelector('.modal-login').addEventListener('click', () => {
        modal.remove();
        toggleLoginModal();
    })
    document.body.appendChild(modal);
}

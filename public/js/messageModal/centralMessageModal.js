function showCentralModal(title, message, callback = null) {
    const existentModal = document.getElementById('centralModal');
    if (existentModal) {
        existentModal.remove();
    };

    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');
    modal.id = 'centralModal';

    modal.innerHTML = `
        <div class="modal-content">
            <h2 class="modal-title">${title}</h2>
            <p class="modal-message">${message}</p>
            <button class="modal-close">Fechar</button>
        </div>
    `;

    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
        if (callback) callback();
    });

    document.body.appendChild(modal);
}

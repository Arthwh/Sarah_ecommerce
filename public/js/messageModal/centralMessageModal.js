function showCentralModal(title, message, callback = null) {
    const existentModal = document.getElementById('centralModal');
    if (existentModal) {
        existentModal.remove();
    };

    // Cria o container do modal
    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');
    modal.id = 'centralModal';

    // Cria o conteúdo do modal
    modal.innerHTML = `
        <div class="modal-content">
            <h2 class="modal-title">${title}</h2>
            <p class="modal-message">${message}</p>
            <button class="modal-close">Fechar</button>
        </div>
    `;

    // Botão de fechar
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
        if (callback) callback();
    });

    // Adiciona o modal ao body
    document.body.appendChild(modal);
}

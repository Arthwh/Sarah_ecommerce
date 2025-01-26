function showOrderModal(status, message, orderId = null) {
    const existentModal = document.getElementById('orderModal');
    if (existentModal) {
        existentModal.remove();
    };

    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');
    modal.id = 'orderModal';

    modal.innerHTML = `
        <div class="modal-content">
            <h2 class="modal-title">Finalização do pedido</h2>
            <img src="/public/images/icons/${status === 'success' ?
            'check_circle_green_icon_large.svg' : 'error_icon_red_large.svg'
        }" alt="status icon">
            <p class="modal-message">${message}</p>
            <div class="modal-buttons">
                ${status === 'success' ?
            `<a href="/account/orders${orderId ? '/' + orderId : ''}" class="modal-button action-btn-contrast" onclick="closeModal()">Acompanhar pedido</a>` : ''
        }
                <button class="modal-close action-btn-contrast">Fechar</button>
            </div>
        </div>
    `;

    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
        status === 'success' ? window.location.href = '/' : '';
    });

    document.body.appendChild(modal);
}

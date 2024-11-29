function showToast(message, type = 'info') {
    const existentToast = document.getElementById('toastModal');
    if (existentToast) {
        existentToast.remove();
    };

    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.id = 'toastModal'

    toast.innerHTML = `
        <img src="../../public/images/icons/${type === 'error' ? 'error_icon_red.svg' : 'check_circle_green_icon.svg'}">
        <div>
            <span class="toast-message">${message}</span>
            <button class="toast-close">&times;</button>
        </div>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 5000); // Remove o toast após 5 segundos
}

// Exemplo de uso:
// showToast('Produto adicionado ao carrinho!', 'success');
// showToast('Erro ao processar pagamento', 'error');
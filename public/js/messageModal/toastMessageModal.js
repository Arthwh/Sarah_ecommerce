function showToast(message, type = 'info') {
    // Cria o container do toast
    const toast = document.createElement('div');
    toast.classList.add('toast', type);

    // Adiciona a mensagem
    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button class="toast-close">&times;</button>
    `;

    // Botão de fechar manual
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });

    // Adiciona o toast ao body
    document.body.appendChild(toast);

    // Remove o toast após 5 segundos
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Exemplo de uso:
// showToast('Produto adicionado ao carrinho!', 'success');
// showToast('Erro ao processar pagamento', 'error');
async function getAvailableColors() {
    try {
        const response = await fetch('/api/products/colors');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.colors;
    } catch (error) {
        console.error('Error fetching colors:', error);
    }
}

async function renderColorOptions() {
    const colorOptionsContainer = document.getElementById('colorOptionsContainer');
    colorOptionsContainer.innerHTML = ''; // Limpa as cores antes de renderizar

    const colors = await getAvailableColors();

    colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');
        colorOption.style.backgroundColor = color.hex;
        colorOption.title = `${color.color} (${color.count})`; // Mostra o nome e a contagem ao passar o mouse

        // Adiciona um evento de clique para filtrar ao selecionar uma cor
        colorOption.addEventListener('click', () => toggleColorFilter(color.color));

        colorOptionsContainer.appendChild(colorOption);
    });
}

// Função para alternar o filtro de cor e adicionar a classe 'selected'
function toggleColorFilter(color) {
    // Lógica de filtragem, onde você pode ativar/desativar o filtro para essa cor
    console.log(`Filtro de cor selecionado: ${color}`);

    // Opcional: Alterne a classe 'selected' no elemento de cor para indicar a seleção
    // e aplique a lógica de atualização de produtos conforme a cor
}

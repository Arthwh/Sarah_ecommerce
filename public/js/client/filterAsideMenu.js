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

function toggleColorFilter(color) {
    console.log(`Filtro de cor selecionado: ${color}`);
}

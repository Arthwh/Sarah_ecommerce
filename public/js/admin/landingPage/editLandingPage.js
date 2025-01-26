// Variável para armazenar o item selecionado
let selectedElement = null;

async function reloadIframe() {
    document.getElementById('landingPageIframe').contentWindow.location.reload();
}

async function discardChanges() {
    if (confirm("Deseja descartar as alterações?")) {
        reloadIframe();
    }
}

async function disableAllLinks() {
    const iframe = document.getElementById("landingPageIframe");
    iframe.onload = function () {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const aElements = iframeDocument.querySelectorAll('a');
        if (aElements.length === 0) {
            console.warn("Nenhum elemento com a classe 'a' encontrado no iframe.");
        }
        aElements.forEach(element => {
            element.addEventListener("click", (event) => {
                event.preventDefault();
            });
        });
    };
}

async function moveElement(element, elementType) {
    const mainElement = element.parentElement.parentElement;
    selectItem(mainElement, elementType);
}

// Função para selecionar o item e mostrar as setas para mover
function selectItem(mainElement, elementType) {
    // Remove a seleção anterior, se houver
    if (selectedElement) {
        selectedElement.classList.remove("selected");
        selectedElement.querySelector(".move-buttons").remove();
    }
    if (selectedElement === mainElement) {
        selectedElement = null;
        return;
    }

    selectedElement = mainElement;
    selectedElement.classList.add("selected");

    const buttons = document.createElement("div");
    buttons.classList.add("move-buttons");
    let elementDatasetProperty = mainElement.dataset.element;
    if (!elementDatasetProperty || elementDatasetProperty != elementType) {
        elementDatasetProperty = mainElement.parentElement.dataset.element
    }
    buttons.innerHTML = `
        <button onclick="moveUp()" class="button-up">
            <img src="/public/images/icons/compare_arrows_icon_white.svg" alt="Trocar esquerda">
        </button>
        <button onclick="moveDown()" class="button-down">
            <img src="/public/images/icons/compare_arrows_icon_white.svg" alt="Trocar direita">
        </button>
    `;
    selectedElement.appendChild(buttons);
}

function moveUp() {
    if (selectedElement && selectedElement.previousElementSibling) {
        editSectionPositionData(selectedElement, selectedElement.previousElementSibling, -1);
        selectedElement.parentNode.insertBefore(selectedElement, selectedElement.previousElementSibling);
    }
}

function moveDown() {
    if (selectedElement && selectedElement.nextElementSibling) {
        editSectionPositionData(selectedElement, selectedElement.nextElementSibling, 1);
        selectedElement.parentNode.insertBefore(selectedElement.nextElementSibling, selectedElement);
    }
}
function editSectionPositionData(selectedElement, nextElement, direction) {
    selectedElement.dataset.componentSectionPosition = (parseInt(selectedElement.dataset.componentSectionPosition) + direction);
    nextElement.dataset.componentSectionPosition = (parseInt(nextElement.dataset.componentSectionPosition) + (direction * -1));
}

async function deleteElement(element) {
    const mainElement = element.parentElement.parentElement;
    if (mainElement.dataset.element === 'section') {
        if (confirm("Deseja remover toda a sessão? Essa ação não pode ser desfeita")) {
            mainElement.remove();
            showToast("Sessão removida com sucesso!", 'success');
            return;
        }
    }
    else {
        mainElement.remove();
        showToast("Elemento removido com sucesso!", 'success');
    }
}

function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

async function saveChanges() {
    const iframe = document.querySelector('iframe');
    if (!iframe) {
        showToast('Erro ao salvar alterações da página inicial.', 'error');
        return;
    }
    const formData = new FormData();
    const bannerFileStorage = iframe.contentWindow.bannerFileStorage
    const sections = await collectSections();
    if (sections) {
        const sectionsData = await getSectionsData(sections);
        const landingPageData = {};
        landingPageData.sectionsData = sectionsData;

        formData.append('sectionsData', JSON.stringify(landingPageData));
        // Adicione as imagens de bannerFileStorage individualmente ao FormData
        if (bannerFileStorage) {
            Object.entries(bannerFileStorage).forEach(([id, file]) => {
                formData.append(`bannerImages[${id}]`, file);
            });
        }
    }
    await sendLandingPageData(formData);
}

async function collectSections() {
    const iframe = document.querySelector('iframe');
    const sections = [];

    if (iframe) {
        const iframeSections = iframe.contentWindow.document.querySelectorAll('.carousel-section, .grid-section, .banner-section, .links-cards-section');
        sections.push(...iframeSections);
    }
    return sections;
}

async function getSectionsData(sections) {
    const sectionsData = [];
    sections.forEach(section => {
        const sectionData = { ...section.dataset };
        if (sectionData.componentSectionModel === 'banner') {
            sectionData.banners = [];
            const banners = section.querySelectorAll('.bannerDiv');
            if (banners) {
                banners.forEach(banner => {
                    const bannerData = { ...banner.dataset }
                    if (bannerData) {
                        sectionData.banners.push(bannerData);
                    }
                });
            }
        }
        sectionsData.push(sectionData);
    });

    return sectionsData;
}

async function sendLandingPageData(landingPageData) {
    try {
        await checkSessionExpired();
        const response = await fetch(`/api/admin/landing-page/save`, {
            method: 'POST',
            body: landingPageData
        });
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        showCentralModal('Salvar alterações da página inicial', 'Alterações salvas com sucesso!', reloadIframe);
    } catch (error) {
        showCentralModal('Salvar alterações da página inicial', 'Ocorreu um erro ao salvar as alterações');
    }
}

async function addComponent(sectionType) {
    const iframe = document.getElementById('landingPageIframe');
    if (!iframe || !iframe.contentWindow || !iframe.contentWindow.addComponent) {
        console.error('Erro ao chamar função para adicionar componente. ');
        return;
    }
    iframe.contentWindow.addComponent(sectionType);
    toggleDropdown();
}
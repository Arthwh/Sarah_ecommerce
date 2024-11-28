window.bannerFileStorage = {};

async function addBannerElement(buttonElement, mainComponentId) {
    const modal = document.createElement('div');
    modal.classList.add('modal-add-banner-overlay');
    modal.innerHTML = `
        <div class="modal-add-banner-content">
            <h3>Configuração do Banner</h3>
            <div>
                <label>Imagem Large</label>
                <input type="file" id="bannerImageLarge" accept="image/*" />
            </div>
            <div>
                <label>Imagem Small</label>
                <input type="file" id="bannerImageSmall" accept="image/*" />
            </div>
            <div>
                <label>Link do Banner</label>
                <input type="url" id="bannerLink" placeholder="https://exemplo.com" />
            </div>
            <div>
                <label>Texto do link</label>
                <input type="text" id="buttonText" placeholder="Texto do link" />
            </div>
            <div>
                <label>
                    <input type="checkbox" id="enableEndDate" />
                    Definir Data de Término
                </label>
                <input type="date" id="endDate" disabled />
            </div>
            <div class="modal-add-banner-buttons">
                <button class="action-btn-contrast" onclick="saveBannerConfig(${mainComponentId})">Salvar</button>
                <button class="action-btn-contrast" onclick="closeModal()">Cancelar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    toggleEndTimeInput();
}

async function toggleEndTimeInput() {
    const modal = document.querySelector('.modal-add-banner-overlay');

    const enableEndDateCheckbox = modal.querySelector("#enableEndDate");
    const endDateInput = modal.querySelector("#endDate");
    enableEndDateCheckbox.addEventListener("change", () => {
        endDateInput.disabled = !enableEndDateCheckbox.checked;
    });
}

async function saveBannerConfig(mainComponentId) {
    const modal = document.querySelector('.modal-add-banner-overlay');
    const enableEndDateCheckbox = modal.querySelector("#enableEndDate");
    const bannerImageLarge = document.getElementById("bannerImageLarge").files[0];
    const bannerImageSmall = document.getElementById("bannerImageSmall").files[0];
    const bannerLink = document.getElementById("bannerLink").value;
    const buttonText = document.getElementById("buttonText").value;
    const dateIsEnable = enableEndDateCheckbox.checked;
    const endDate = dateIsEnable ? document.getElementById("endDate").value : '';

    if (!bannerImageLarge || !bannerImageSmall || !bannerLink || !buttonText || (dateIsEnable === true && !endDate)) {
        showCentralModal('Erro ao adicionar novo banner', 'Preencha todos os campos!');
        return;
    }
    const bannerData = {
        mainComponentId,
        bannerImageLarge,
        bannerImageSmall,
        bannerLink,
        buttonText,
        endDate,
    };
    try {
        const bannerElement = await createBannerElement(bannerData);
        await loadBannerImages(bannerImageLarge, 'banner_image_large', bannerElement);
        await loadBannerImages(bannerImageSmall, 'banner_image_small', bannerElement);
        showToast('Imagens adicionadas com sucesso!', 'success');
        closeModal();
    } catch (error) {
        console.error(error);
        showCentralModal('Erro ao adicionar novo banner', error)
    }
};

async function createBannerElement(bannerData) {
    const mainContainer = document.getElementById(`bannerSection_${bannerData.mainComponentId}`)
    if (!mainContainer) {
        throw Error('Main container not found!');
    }
    const bannerCount = mainContainer.querySelectorAll('.bannerDiv')?.length
    const element = document.createElement('div');
    element.className = 'bannerDiv editable';
    element.dataset.index = bannerCount + 1;
    element.dataset.active = bannerCount == 0 ? true : false;
    element.dataset.element = 'item';
    element.dataset.link = bannerData.bannerLink;
    element.dataset.linkName = bannerData.buttonText;
    element.dataset.newBanner = true;
    element.dataset.endDate = bannerData.endDate;

    const imagesId = await saveFilesIntoVariable(bannerData.bannerImageLarge, bannerData.bannerImageSmall)
    element.dataset.imageLargeId = imagesId.largeImageId;
    element.dataset.imageSmallId = imagesId.smallImageId;
    const bannerElement = `
                        <div class="edit-buttons" data-component-id="bannerSection_${bannerData.mainComponentId}">
                            <button class="move-btn" onclick="moveElement(this, 'item')">
                                <img src="/public/images/icons/move_icon_white.svg" alt="mover">
                            </button>
                            <button class="delete-btn" onclick="deleteElement(this)">
                                <img src="/public/images/icons/remove_icon_white.svg" alt="remover">
                            </button>
                        </div>
                            <a href="${bannerData.bannerLink}">
                                <img class="banner_image_large" alt="bannerImage">
                                <img class="banner_image_small" alt="bannerImage">
                                <a href="${bannerData.bannerLink}" class="banner_button">
                                ${bannerData.buttonText}
                                </a>
                            </a>
    `;
    element.innerHTML = bannerElement;
    element.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    })
    const bannerCarousel = document.getElementById(`bannerCarousel_${bannerData.mainComponentId}`);
    if (!bannerCarousel) {
        throw Error('Banner carousel not found!')
    }
    const buttonPrev = bannerCarousel.querySelector('.carousel-control');
    bannerCarousel.insertBefore(element, buttonPrev);
    return element;
}

async function loadBannerImages(imageFile, imageComponent, bannerElement) {
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Define o src da imagem como o resultado da leitura
            const element = bannerElement.querySelector(`.${imageComponent}`);
            if (element) {
                element.src = e.target.result;
            }
            else {
                throw Error("Image element not found!")
            }
        };
        reader.readAsDataURL(imageFile); // Lê o arquivo como uma URL de dados
    }
}

async function saveFilesIntoVariable(largeImage, smallImage) {
    const largeImageId = Date.now();
    const smallImageId = Date.now() + 1;

    const largeImageExtension = getFileExtension(largeImage.name);
    const smallImageExtension = getFileExtension(smallImage.name);
    // Renomear os arquivos para usar os IDs gerados
    const renamedLargeImage = new File([largeImage], `${largeImageId}.${largeImageExtension}`, { type: largeImage.type });
    const renamedSmallImage = new File([smallImage], `${smallImageId}.${smallImageExtension}`, { type: smallImage.type });
    // Salvar os arquivos renomeados na variável global
    window.bannerFileStorage[largeImageId] = renamedLargeImage;
    window.bannerFileStorage[smallImageId] = renamedSmallImage;
    return { smallImageId, largeImageId };
}

function getFileExtension(filename) {
    return filename.split('.').pop();
}

async function closeModal() {
    const modal = document.querySelector('.modal-add-banner-overlay');
    document.body.removeChild(modal);
}
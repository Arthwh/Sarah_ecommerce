async function showEditComponentModal(mainElementId, sectionType) {
    sectionType = capitalizeFirstLetter(sectionType)
    const mainComponent = document.getElementById(mainElementId);
    const productType = mainComponent.dataset.productType;
    const productLimit = mainComponent.dataset.productLimit;
    const productEndDate = mainComponent.dataset.endDate;
    const sectionTitle = mainComponent.dataset.title;
    const productEndDateFormated = productEndDate.split("T")[0];
    const modal = document.createElement('div');
    modal.classList.add('modal-edit-sections-overlay');
    modal.innerHTML = `
        <div class="modal-edit-sections-content">
            <h3>Edição da Sessão</h3>
            <div>
                <label>Título da sessão</label>
                <input type="text" id="sectionTitle" value="${sectionTitle}" placeholder="Sem título"/>
            </div>
            <div>
                <label>Produtos em exibição</label>
                <select id="product-type">
                    <option ${productType === 'offers' ? 'selected' : ''} value="offers">Produtos em ofertas</option>
                    <option ${productType === 'bestSelling' ? 'selected' : ''} value="bestSelling">Produtos mais vendidos</option>
                    <option ${productType === 'newArrivals' ? 'selected' : ''} value="newArrivals">Novidades</option>
                    <option ${productType === 'highestRated' ? 'selected' : ''} value="highestRated">Mais Avaliados</option>
                </select>
            </div>
            <div>
                <label>Quantidade de produtos</label>
                <input type="number" id="productLimit" min="1" max="20" value="${productLimit ? productLimit : 10}" />
            </div>
            <div>
                <label>Estilo de Exibição</label>
                <input readonly id="displayStyle" value="${sectionType}"/>
            </div>
            <div>
                <label>
                    <input type="checkbox" id="enableEndDate" ${productEndDate ? 'checked' : ''} />
                    Definir Data de Término
                </label>
                <input type="date" id="endDate" ${!productEndDate ? 'disabled' : ''} />
            </div>
            <div class="modal-edit-sections-buttons">
                <button onclick="saveSectionConfig('${mainElementId}')">Salvar</button>
                <button onclick="closeEditSectionModal()">Cancelar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    if (productEndDate) {
        document.getElementById('endDate').value = productEndDateFormated;
    }

    // Configura o comportamento do checkbox para habilitar o campo de data
    document.getElementById("enableEndDate").addEventListener("change", function () {
        document.getElementById("endDate").disabled = !this.checked;
    });
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

async function saveSectionConfig(mainElementId) {
    const productType = document.getElementById('product-type').value;
    const productLimit = document.getElementById('productLimit').value;
    const productEndDate = document.getElementById('endDate');
    const enableEndDate = document.getElementById('enableEndDate').checked;
    const sectionTitle = document.getElementById('sectionTitle').value
    var endDate = productEndDate.value;
    if (productEndDate.disabled) {
        endDate = '';
    };

    if (!productType || !productLimit || (!endDate && enableEndDate === true)) {
        showCentralModal('Erro ao editar sessão', 'Preencha todos os campos.');
        return;
    }
    if (productLimit > 20) {
        showCentralModal('Erro ao editar sessão', 'Quantidade de produtos excede o máximo permitido (20).');
        return;
    }
    const mainComponent = document.getElementById(mainElementId);
    if (!mainComponent) {
        showToast('Erro ao salvar alterações. <br>Tente novamente mais tarde.', 'error');
        return;
    }
    mainComponent.dataset.productType = productType;
    mainComponent.dataset.productLimit = productLimit;
    mainComponent.dataset.endDate = endDate;
    mainComponent.dataset.title = sectionTitle;

    setTitleIntoElement(mainElementId, sectionTitle);
    showToast('Sessão editada com sucesso!', 'success');
    closeEditSectionModal();
}

async function closeEditSectionModal() {
    document.querySelector(".modal-edit-sections-overlay").remove();
}

async function setTitleIntoElement(mainElementId, title) {
    const element = document.getElementById(mainElementId).querySelector('.titleSection h2');
    element.textContent = title;
}
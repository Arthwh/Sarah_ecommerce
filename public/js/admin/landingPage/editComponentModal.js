let categoriesAndSubcategories = [];

async function fetchCategoriesAndSubcategories() {
    try {
        const categories = await fetch('/api/products/categories/subcategories').then(response => {
            if (!response.ok) {
                throw new Error('Falha ao carregar categorias');
            };
            return response.json();
        });
        categoriesAndSubcategories = categories;
    } catch (error) {
        console.error(error);
        throw Error('Erro ao carregar categorias e subcategorias: ' + error.message);
    }
}

function addOptionsToCategorySelect(selectElement, categorySelected = null, subcategorySelected = null) {
    if (selectElement) {
        categoriesAndSubcategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = `${category.name} (${category.id})`;
            selectElement.appendChild(option);
            if (categorySelected == category.id) {
                option.selected = true;
                let subcategory = category.subcategories.find(subcat => subcat.id == subcategorySelected);
                if (subcategory) {
                    renderSubcategoryByCategorySelected(category.id, selectElement, subcategory.id);
                }
            }
        });
        selectElement.onchange = (e) => {
            renderSubcategoryByCategorySelected(e.target.value, selectElement);
        }
    }
}

function renderSubcategoryByCategorySelected(categoryId, element, subcategorySelected = null) {
    const subcategorySelect = element.nextElementSibling;
    if (categoryId == '') {
        if (subcategorySelect) {
            subcategorySelect.style.display = 'none';
            subcategorySelect.innerHTML = '';
        }
        return;
    }
    const categorySelected = categoriesAndSubcategories.find(category => category.id == categoryId);
    if (categorySelected) {
        if (!subcategorySelect) {
            subcategorySelect = document.createElement('select');
        }
        subcategorySelect.innerHTML = '<option value=""></option>';
        const subcategories = categorySelected.subcategories;
        subcategories.forEach(subcategorie => {
            const option = document.createElement('option');
            option.value = subcategorie.id;
            option.textContent = `${subcategorie.name} (${subcategorie.id})`;
            subcategorySelect.appendChild(option);
            if (subcategorySelected == subcategorie.id) {
                option.selected = true;
            }
        })
    }
    subcategorySelect.style.display = 'block';
}

async function showEditAddSectionModal(mode, { productType = null, productLimit = 10, productEndDate = null, sectionTitle = '', sectionType, mainElementId, sectionId }) {
    const modal = document.createElement('div');
    modal.classList.add('modal-edit-sections-overlay');
    modal.innerHTML = `
        <div class="modal-edit-sections-content">
            <h3>${mode === 'edit' ? 'Edição da' : 'Adição de'} Sessão</h3>
            <div>
                <label>Título da sessão</label>
                <input type="text" id="sectionTitle" value="${sectionTitle}" placeholder="Sem título"/>
            </div>
            <div>
                <label>Produtos em exibição</label>
                <div>
                    <select id="product-type" onchange="checkProductTypeSelected(this)">
                        <option disabled ${!productType ? 'selected' : ''} value="">Selecione uma opção...</option>
                        <option ${productType === 'offers' ? 'selected' : ''} value="offers">Produtos em ofertas</option>
                        <option ${productType === 'bestSelling' ? 'selected' : ''} value="bestSelling">Produtos mais vendidos</option>
                        <option ${productType === 'newArrivals' ? 'selected' : ''} value="newArrivals">Novidades</option>
                        <option ${productType === 'highestRated' ? 'selected' : ''} value="highestRated">Mais Avaliados</option>
                        <option ${productType === 'category' ? 'selected' : ''} value="category">Categoria</option>
                        <option ${productType === 'subcategory' ? 'selected' : ''} value="subcategory">Subcategoria</option>
                    </select>
                </div>
                <div id="product-type-category-subcategory-container">
                    <div class="flex mb-2 space-y-4">
                        <select id="product-type-category">
                            <option value="" disable selected class="placeholderSelect">Selecione uma categoria...</option>
                        </select>
                        <select id="product-type-subcategory"></select>
                    </div>
                </div>
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
                <button class="action-btn-contrast" onclick="saveSectionConfig('${sectionId}','${mainElementId}', '${mode}', '${sectionType}')">Salvar</button>
                <button class="action-btn-contrast" onclick="closeSectionModal()">Cancelar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById("enableEndDate").addEventListener("change", function () {
        document.getElementById("endDate").disabled = !this.checked;
    });
}

function checkProductTypeSelected(element) {
    const selected = element.value;
    if (selected === 'category') {
        document.getElementById('product-type-category').style.display = "block";
    }
    else if (selected === 'subcategory') {
        document.getElementById('product-type-category').style.display = "block";
        document.getElementById('product-type-subcategory').style.display = "block";
    }
    else {
        document.getElementById('product-type-category').style.display = "none";
        document.getElementById('product-type-subcategory').style.display = "none";
    }
}

async function editComponent(mainElementId, sectionType) {
    sectionType = capitalizeFirstLetter(sectionType)
    const mainComponent = document.getElementById(mainElementId);
    const productType = mainComponent.dataset.productType;
    const productLimit = mainComponent.dataset.productLimit;
    const productEndDate = mainComponent.dataset.endDate;
    const sectionTitle = mainComponent.dataset.title;
    const productEndDateFormated = productEndDate.split("T")[0];
    const categorySelectedId = mainComponent.dataset.productTypeCategory;
    const subcategorySelectedId = mainComponent.dataset.productTypeSubcategory;

    await showEditAddSectionModal('edit', { productType, productLimit, productEndDate, sectionTitle, sectionType, mainElementId });
    const productTypeSelect = document.getElementById('product-type');
    checkProductTypeSelected(productTypeSelect);
    await fetchCategoriesAndSubcategories();
    const categorySelect = document.getElementById('product-type-category');
    addOptionsToCategorySelect(categorySelect, categorySelectedId, subcategorySelectedId);

    if (productEndDate) {
        document.getElementById('endDate').value = productEndDateFormated;
    }
}

async function addComponent(sectionType) {
    try {
        await checkSessionExpired();
        if (sectionType === 'banner') {
            const sectionId = Date.now();
            const mainElement = document.querySelector('main');
            const sectionPosition = mainElement.querySelectorAll('[data-element="section"]').length + 1;
            const sectionHTML = await getNewSectionElement(sectionId, sectionType, 'image', null, null, null, null, null, null, sectionPosition);
            mainElement.insertAdjacentHTML('beforeend', sectionHTML);
        }
        else if (sectionType === 'carousel' || sectionType === 'grid') {
            const sectionId = Date.now();
            const mainElementId = `${sectionType}Section_${sectionId}`;
            await showEditAddSectionModal('add', { sectionType, mainElementId, sectionId });
            await fetchCategoriesAndSubcategories();
            const categorySelect = document.getElementById('product-type-category');
            addOptionsToCategorySelect(categorySelect);
        }
        else if (sectionType === 'cards') {
            alert('Funcionalidade em implementação')
        }
        else throw Error('Tipo da sessão inválida.');
    } catch (error) {
        closeSectionModal();
        console.error(`Erro ao carregar modal de adição de sessão: ${error}`);
        showToast(`Erro ao carregar modal de adição de sessão:<br>${error.message}`, 'error');
    }
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

async function saveSectionConfig(sectionId, mainElementId, mode, sectionType) {
    try {
        const productType = document.getElementById('product-type').value;
        const productTypeCategory = document.getElementById('product-type-category').value;
        const productTypeSubcategory = document.getElementById('product-type-subcategory').value;
        const productLimit = document.getElementById('productLimit').value;
        const productEndDate = document.getElementById('endDate');
        const enableEndDate = document.getElementById('enableEndDate').checked;
        const sectionTitle = document.getElementById('sectionTitle').value;
        const mainComponent = document.getElementById(mainElementId);
        const sectionPosition = mainComponent?.dataset.componentSectionPosition ? parseInt(mainComponent.dataset.componentSectionPosition, 10) : document.querySelectorAll('[data-element="section"]').length + 1;
        let endDate = productEndDate.disabled !== true ? productEndDate.value : '';

        if (!productType || !productLimit || (!endDate && enableEndDate === true)) {
            showToast(`${mode === 'add' ? 'Erro ao criar sessão' : 'Erro ao editar sessão'}: Preencha todos os campos`, 'error');
            return;
        }
        if (productType === 'category' && !productTypeCategory) {
            showToast(`${mode === 'add' ? 'Erro ao criar sessão' : 'Erro ao editar sessão'}: Selecione uma categoria`, 'error');
            return;
        }
        if (productType === 'subcategory' && (!productTypeCategory || !productTypeSubcategory)) {
            showToast(`${mode === 'add' ? 'Erro ao criar sessão' : 'Erro ao editar sessão'}: Selecione uma categoria e uma subcategoria`, 'error');
            return;
        }
        if (productLimit > 20) {
            showToast(`${mode === 'add' ? 'Erro ao criar sessão' : 'Erro ao editar sessão'}: Quantidade de produtos excede o máximo permitido (20)`, 'error');
            return;
        }

        if (mode === 'add') {
            const sectionHTML = await getNewSectionElement(sectionId, sectionType, 'product', productType, sectionTitle, productLimit, productTypeCategory, productTypeSubcategory, endDate, sectionPosition)
            const mainElement = document.querySelector('main');
            mainElement.insertAdjacentHTML('beforeend', sectionHTML);
        }
        else {
            if (!mainComponent) {
                showToast('Erro ao salvar alterações. <br>Tente novamente mais tarde.', 'error');
                return;
            }
            mainComponent.dataset.productType = productType;
            mainComponent.dataset.productLimit = productLimit;
            mainComponent.dataset.endDate = endDate;
            mainComponent.dataset.title = sectionTitle;
            productTypeCategory ? mainComponent.dataset.productTypeCategory = productTypeCategory : '';
            productTypeSubcategory ? mainComponent.dataset.productTypeSubcategory = productTypeSubcategory : '';
            setTitleIntoElement(mainElementId, sectionTitle);
        }
        let message = 'Sessão editada com sucesso!';
        if (mode === 'edit') {
            message = 'Sessão editada com sucesso!<br><b>OBS: As mudanças de tipo de produto em exibição serão aplicadas ao salvar as alterações.</b>';
        }
        showToast(message, 'success');
        closeSectionModal();
    } catch (error) {
        console.error(error);
        showCentralModal('Erro ao salvar alterações: ' + error.message)
    }

}

async function closeSectionModal() {
    document.querySelector(".modal-edit-sections-overlay").remove();
}

async function setTitleIntoElement(mainElementId, title) {
    const element = document.getElementById(mainElementId).querySelector('.titleSection h2');
    element.textContent = title;
}

async function getNewSectionElement(sectionId, sectionType, sectionContentType, productType, sectionTitle, productLimit, productTypeCategory, productTypeSubcategory, endDate, sectionPosition) {
    try {
        const response = await fetch('/api/landing-page/section', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sectionId: sectionId, sectionModel: sectionType, contentType: sectionContentType, sectionProductType: productType, sectionTitle: sectionTitle, sectionProductLimit: productLimit,
                sectionProductTypeCategoryId: productTypeCategory, sectionProductTypeSubcategoryId: productTypeSubcategory, endDate: endDate, sectionPosition: sectionPosition
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.message);
            }
            return response.text();
        });

        return response;
    } catch (error) {
        console.error('Erro ao obter conteúdo da sessão: ' + error);
        showCentralModal('Erro ao obter conteúdo da sessão: ' + error);
        throw Error('Erro ao obter conteúdo da sessão: ' + error);
    }
}
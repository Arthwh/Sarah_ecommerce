var categoriesAndSubcategories = [];
var allBrands = [];
var variantsWithImages = [];
const formData = new FormData();

// Função de renderização do cadastro de produtos
async function renderProductRegister() {
    try {
        await checkSessionExpired();

        const optionVisualizationContainer = document.getElementById('optionVisualizationContainer');
        if (!optionVisualizationContainer) {
            throw new Error("Container para renderização não encontrado")
        }

        const [form, categories, brands] = await Promise.all([
            fetch('/public/html/admin/productRegisterForm.html').then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao carregar o formulário');
                }
                return response.text();
            }),
            fetch('/api/products/categories/subcategories').then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao carregar categorias');
                }
                return response.json();
            }),
            fetch('/api/products/brands').then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao carregar marcas');
                }
                return response.json();
            })
        ]);

        optionVisualizationContainer.innerHTML = form;
        categoriesAndSubcategories = categories;
        const categoriesDiv = document.getElementById('categoriesAndSubcategoriesContent');
        addOptionsToCategorySelect(categoriesDiv.querySelector('select'));
        allBrands = brands;
        addBrandsIntoSelect(brands)
    } catch (error) {
        showCentralModal("Cadastro de produto", error.message + ".<br>Tente novamente mais tarde.");
        console.error(error);
    }
}

async function addBrandsIntoSelect(brands) {
    try {
        const brandSelect = document.getElementById('brand');
        if (brands.length === 0) {
            throw new Error('Nenhuma marca encontrada.')
        }
        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand.id;
            option.textContent = brand.name;
            brandSelect.appendChild(option);
        });
    } catch (error) {
        throw Error(error);
    }
}

function addOptionsToCategorySelect(selectElement) {
    if (selectElement) {
        categoriesAndSubcategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = `${category.name} (${category.id})`;
            selectElement.appendChild(option);
        });
        selectElement.onchange = (e) => {
            renderSubcategoryByCategorySelected(e.target.value, selectElement);
        }
    }
}

function renderSubcategoryByCategorySelected(categoryId, element) {
    const subcategorySelect = element.nextElementSibling;

    if (categoryId == '') {
        if (subcategorySelect && !subcategorySelect.classList.contains('hidden')) {
            subcategorySelect.classList.add('hidden');
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
        })
    }
    if (subcategorySelect.classList.contains('hidden')) {
        subcategorySelect.classList.remove('hidden');
    }
}

function addNewCategory() {
    const categoriesAndSubcategoriesContent = document.getElementById('categoriesAndSubcategoriesContent');
    const newCategorySelectContainer = document.createElement('div');
    newCategorySelectContainer.className = 'flex mb-2 space-x-2';
    newCategorySelectContainer.innerHTML = `
                    <select required name="category[]"
                        class="flex-grow ring-black/20 w-1/2 px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:border-black">
                                                <option value="" disable selected class="placeholderSelect">Selecione uma categoria...</option>
                    </select>
                    <select required name="subcategory[]"
                        class="hidden flex-grow ring-black/20 w-1/2 px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:border-black">
                    </select>
                    <div class="group flex items-center flex-shrink-0">
                        <button onclick="deleteCategory(this)">
                            <img class="group-hover:hidden" src="/public/images/icons/delete_icon_border_black.svg"
                                alt="trash">
                            <img class="hidden group-hover:block" src="/public/images/icons/delete_icon_fill_black.svg"
                                alt="trash">
                        </button>
                    </div>`;
    categoriesAndSubcategoriesContent.appendChild(newCategorySelectContainer);
    addOptionsToCategorySelect(newCategorySelectContainer.querySelector('select[name="category[]"]'));
}

function deleteCategory(button) {
    const categoryDiv = button.parentElement.parentElement;
    if (categoryDiv) {
        categoryDiv.remove();
    }
}

function toggleVariantModal() {
    const variantModal = document.getElementById('variantModal');
    if (variantModal.classList.contains('hidden')) {
        variantModal.classList.remove('hidden');
        checkIfThereAreImagesToInherit();
        updateInheritImageSelect();
    }
    else {
        variantModal.classList.add('hidden');
        clearDataVariantModal();
        document.getElementById('previewImagesContainer').innerHTML = '';
    }
}

function clearDataVariantModal() {
    const variantModalContent = document.getElementById('variantModalContent');
    const inputs = variantModalContent.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
        if (input.checked) {
            input.checked = false;
            toggleImagesContainerOrInherit(false);
        }
    });

    const selects = variantModalContent.querySelectorAll('select');
    selects.forEach(select => {
        select.selectedIndex = 0; // Define o valor para o primeiro <option>
    });

    const spans = variantModalContent.querySelectorAll('span');
    spans.forEach(span => {
        span.innerHTML = '';
    })
}

function formatPriceForInputField(input) {
    let value = input.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
    value = (value / 100).toFixed(2) + ''; // Converte para decimal
    value = value.replace('.', ','); // Troca o ponto pela vírgula
    value = value.replace(/(\d)(?=(\d{3})+\,)/g, "$1."); // Adiciona ponto como separador de milhar
    input.value = 'R$ ' + value;
};

function formatPriceForFormData(price) {
    let value = price.replace('R$ ', '').replace('.', '').replace(',', '.'); // Remove
    value = parseInt(value);
    return value;
}

function calculateInstallmentsValues() {
    const price = document.getElementById('variantPrice').value;
    const installments = document.getElementById('variantInstallments').value;
    const installmentsValue = document.getElementById('variantInstallmentsValue');
    const showVariantInstallmentsValue = document.getElementById('showVariantInstallmentsValue');

    if (price && installments) {
        const priceFormated = parseFloat(price.replace('R$', '').replace(/\./g, '').replace(',', '.'));
        const value = (priceFormated / installments)
        const valueFormated = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        installmentsValue.value = value.toFixed(2);
        showVariantInstallmentsValue.innerHTML = installments + "x de " + valueFormated;
    }
}

function checkIfThereAreImagesToInherit() {
    const inheritImage = document.getElementById('inheritImage');
    console.log(variantsWithImages)
    if (variantsWithImages.length === 0) {
        inheritImage.parentElement.classList.add('hidden');
    }
    else {
        inheritImage.parentElement.classList.remove('hidden');
    }
}

function toggleImagesContainerOrInherit(checked) {
    const inputImagesContainer = document.getElementById('inputImagesContainer');
    const inheritVariantSelectContainer = document.getElementById('inheritVariantSelectContainer');
    if (checked) {
        inputImagesContainer.classList.add('hidden');
        inheritVariantSelectContainer.classList.remove('hidden');
    }
    else {
        inputImagesContainer.classList.remove('hidden');
        inheritVariantSelectContainer.classList.add('hidden');
    }
}

function addImagesPreview(inputElement) {
    const previewImagesContainer = document.getElementById('previewImagesContainer');
    const images = inputElement.files;
    if (images) {
        previewImagesContainer.classList.remove('hidden');
        for (const image of images) {
            const element = document.createElement('div');
            element.className = 'w-fit'
            element.id = image.name;
            const imageUrl = URL.createObjectURL(image);
            element.innerHTML = `<img src="${imageUrl}" alt="image" class="w-12 h-12"/>`;
            previewImagesContainer.appendChild(element);
        };
    }
    else {
        if (!previewImagesContainer.classList.contains('hidden')) {
            previewImagesContainer.classList.add('hidden');
        }
    }
}

function verifyVariantData() {
    const variantPrice = document.getElementById('variantPrice');
    const variantInstallments = document.getElementById('variantInstallments');
    const variantColor = document.getElementById('variantColor');
    const variantColorCode = document.getElementById('variantColorCode');
    const variantSize = document.getElementById('variantSize');
    const variantInitialStock = document.getElementById('variantInitialStock');
    const inheritImage = document.getElementById('inheritImage');
    const inheritImageSelect = document.getElementById('inheritImageSelect');
    const variantImages = document.getElementById('variantImages');

    var ok = true;

    const variantPriceError = document.getElementById('variantPriceError');
    const variantInstallmentsError = document.getElementById('variantInstallmentsError');
    const variantColorError = document.getElementById('variantColorError');
    const variantColorCodeError = document.getElementById('variantColorCodeError');
    const variantSizeError = document.getElementById('variantSizeError');
    const variantInitialStockError = document.getElementById('variantInitialStockError');
    const inheritImageSelectError = document.getElementById('inheritImageSelectError');
    const variantImagesError = document.getElementById('variantImagesError');

    variantPriceError.innerHTML = '';
    variantColorError.innerHTML = '';
    variantSizeError.innerHTML = '';
    variantImagesError.innerHTML = '';

    if (!variantPrice.value) {
        variantPriceError.innerHTML = 'O preço do item é um campo obrigatório.';
        variantPriceError.classList.remove('hidden');
        ok = false;
    }
    if (!variantInstallments.value) {
        variantInstallmentsError.innerHTML = 'O número de parcelas é um campo obrigatório.';
        variantInstallmentsError.classList.remove('hidden');
        ok = false;
    }
    if (!variantColor.value) {
        variantColorError.innerHTML = 'A cor do item é um campo obrigatório.';
        variantColorError.classList.remove('hidden');
        ok = false;
    }
    if (!variantColorCode.value) {
        variantColorCodeError.innerHTML = 'O código da cor é um campo obrigatório.';
        variantColorCodeError.classList.remove('hidden');
        ok = false;
    }
    if (!variantSize.value) {
        variantSizeError.innerHTML = 'O tamanho do item é um campo obrigatório.';
        variantSizeError.classList.remove('hidden');
        ok = false;
    }
    if (!variantInitialStock.value) {
        variantInitialStockError.innerHTML = 'O estoque inicial é um campo obrigatório.';
        variantInitialStockError.classList.remove('hidden');
        ok = false;
    };
    if (!inheritImage.checked && variantImages.files.length === 0) {
        variantImagesError.innerHTML = 'Pelo menos uma imagem é necessária.';
        variantImagesError.classList.remove('hidden');
        ok = false;
    }
    if (inheritImage.checked && !inheritImageSelect.value) {
        inheritImageSelectError.innerHTML = 'Selecione uma variante para herdar a imagem.';
        inheritImageSelectError.classList.remove('hidden');
        ok = false;
    }
    return ok;
}

async function saveVariant() {
    const ok = verifyVariantData();
    if (ok) {
        const variantId = Date.now();
        const variantData = document.getElementById('variantModalContent').querySelectorAll('input, select');
        const { variantObject, images } = convertInputsToVariantObject(variantData, variantId);
        if (images.length > 0) {
            addVariantToVariantsWithImagesVariable(variantObject);
        }

        console.log('Dados da variante:', variantObject);
        console.log('imagens da variante:', images);
        setVariantDataIntoFormData(variantObject, images)
        const tableUpdated = await setVariantDataIntoTable(variantObject);
        if (tableUpdated) {
            toggleVariantModal();
        }
    }
}

function addVariantToVariantsWithImagesVariable(variantObject) {
    const name = `Cor: ${variantObject.variantColor} | Tamanho: ${variantObject.variantSize}`;
    variantsWithImages.push({
        id: variantObject.variantId,
        displayName: name
    });
};

function updateInheritImageSelect() {
    const inheritImageSelect = document.getElementById('inheritImageSelect');

    inheritImageSelect.innerHTML = '<option value="">Nenhum</option>';
    variantsWithImages.forEach(variant => {
        const option = document.createElement('option');
        option.value = variant.id;
        option.textContent = variant.displayName;
        inheritImageSelect.appendChild(option);
    });
}

function convertInputsToVariantObject(variantData, variantId) {
    let variantObject = {};
    let images = [];

    variantObject["variantId"] = variantId;
    variantObject["variantImage"] = variantId;

    variantData.forEach(input => {
        if (input.type === 'checkbox') {
            variantObject[input.id] = input.checked;
        }
        else if (input.tagName === 'SELECT') {
            if (input.value !== "") {
                variantObject[input.id] = input.value;
            }
        }
        else if (input.type === 'file') {
            Array.from(input.files).forEach((file, index) => {
                const renamedFile = new File([file], `${variantId}_${file.name}`, { type: file.type });
                images.push(renamedFile);
            });
            variantObject["imagesCount"] = input.files.length;
        } else {
            variantObject[input.id] = input.value;
        }
    });

    if (variantObject.inheritImage) {
        variantObject.variantImage = +variantObject.inheritImageSelect;
    }

    return { variantObject, images };
}

function setVariantDataIntoFormData(variantObject, images) {
    // Se já houver variantes no FormData, pegamos as existentes
    let variantsArray = formData.get('variants') ? JSON.parse(formData.get('variants')) : [];
    // Adiciona a nova variante ao array de variantes
    variantsArray.push({ variantId: variantObject['variantId'], ...variantObject });
    // Atualiza o FormData com o array de variantes
    formData.set('variants', JSON.stringify(variantsArray));
    // Adiciona as imagens da variante ao FormData
    if (images && images.length > 0) {
        images.forEach(image => {
            formData.append('variantImages', image);  // Adiciona cada imagem separadamente
        });
    }
}

async function setVariantDataIntoTable(variantObject) {
    const table = document.getElementById('variantsDataTableContainer');
    const tableBody = table.querySelector('tbody');
    const variantId = variantObject["variantId"];

    if (!tableBody) {
        console.error('Tabela não encontrada.');
        return false;
    }

    const tableRow = document.createElement('tr');
    tableRow.id = `variant[${variantId}]`;
    tableRow.className = 'mx-auto';
    tableRow.id = variantId;

    const columns = ['variantColor', 'variantSize', 'variantPrice'];
    columns.forEach(key => {
        const tableCell = document.createElement('td');
        tableCell.textContent = variantObject[key];
        tableRow.appendChild(tableCell);
    });

    const tableCell = document.createElement('td');
    if (variantObject['inheritImage']) {
        tableCell.textContent = `Herdadas de ${variantObject.inheritImageSelect}`;
    } else if (variantObject['variantImage'] && variantObject['imagesCount'] > 0) {
        tableCell.textContent = `${variantObject['imagesCount']} imagens selecionadas`;
    } else {
        tableCell.textContent = 'Nenhuma imagem selecionada';
    }
    tableRow.appendChild(tableCell);

    // Adiciona botão de edição
    const tableCellForEditButton = document.createElement('td');
    tableCellForEditButton.innerHTML = `
        <button type="button" class="group w-fit" id="variant${variantId}_editButton" onclick="editVariant(${variantId})">
            <img class="group-hover:hidden" src="/public/images/icons/edit_square_icon_border_black.svg" alt="edit">
            <img class="hidden group-hover:block" src="/public/images/icons/edit_square_icon_fill_black.svg" alt="edit">
        </button>
    `;
    tableRow.appendChild(tableCellForEditButton);

    tableBody.appendChild(tableRow);
    table.classList.remove('hidden');
    return true;
}

function editVariant(variantId) {
    console.log("editando variante " + variantId)
}

function checkBaseProductFormData() {
    const form = document.getElementById('productRegisterForm');
    const productName = document.getElementById('productName').value.trim();
    const productDescription = document.getElementById('productDescription').value.trim();
    const brand = document.getElementById('brand').value;
    const categorySelects = form.querySelectorAll('select[name="category[]"]');
    const subcategorySelects = form.querySelectorAll('select[name="subcategory[]"]');

    const productNameError = document.getElementById('productNameError');
    const productDescriptionError = document.getElementById('productDescriptionError');
    const productBrandError = document.getElementById('productBrandError');
    const categoriesAndSubcategoriesError = document.getElementById('categoriesAndSubcategoriesError');

    productNameError.innerHTML = '';
    productDescriptionError.innerHTML = '';
    productBrandError.innerHTML = '';
    categoriesAndSubcategoriesError.innerHTML = '';

    var ok = true;
    if (!productName) {
        productNameError.innerHTML = "O nome do produto é obrigatório."
        productNameError.classList.remove('hidden');
        ok = false;
    }
    if (!productDescription) {
        productDescriptionError.innerHTML = "A descrição do produto é obrigatória."
        productDescriptionError.classList.remove('hidden');
        ok = false;
    }
    if (!brand) {
        productBrandError.innerHTML = "A marca do produto é obrigatória."
        productBrandError.classList.remove('hidden');
        ok = false;
    }

    let categoryValid = false;
    categorySelects.forEach(select => {
        if (select.value) {
            categoryValid = true;
        }
    });
    if (!categoryValid) {
        categoriesAndSubcategoriesError.innerHTML = "Selecione pelo menos uma categoria."
        categoriesAndSubcategoriesError.classList.remove('hidden');
        ok = false;
    }

    for (let i = 0; i < subcategorySelects.length; i++) {
        const subcategorySelect = subcategorySelects[i];
        if (!subcategorySelect.classList.contains('hidden') && !subcategorySelect.value) {
            categoriesAndSubcategoriesError.innerHTML = "Selecione pelo menos uma subcategoria."
            categoriesAndSubcategoriesError.classList.remove('hidden');
            ok = false;
        }
    }
    return ok;
}

async function createProduct(event) {
    event.preventDefault();
    if (!checkBaseProductFormData()) {
        return;
    }
    const baseProductFormValues = new FormData(event.target)
    const mergedFormData = mergeFormData(baseProductFormValues, formData);

    if (!mergeFormData) {
        alert("Erro ao criar produto!");
        return
    }

    try {
        const response = await fetch('/api/admin/products/register', {
            method: 'POST',
            body: mergedFormData
        });
        if (response.ok) {
            showToast("Produto criado com sucesso!", "success");
            renderProductRegister();
        } else {
            const errorText = await response.message;
            showToast(`Erro no processamento: ${errorText || "Desconhecido"} (Status: ${response.status})`, "error")
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
    }
};

function mergeFormData(formData1, formData2) {
    const mergedFormData = new FormData();
    // Copia os dados do formData1 para mergedFormData
    for (let [key, value] of formData1.entries()) {
        mergedFormData.append(key, value);
    }
    // Copia os dados do formData2 para mergedFormData
    for (let [key, value] of formData2.entries()) {
        mergedFormData.append(key, value);
    }

    return mergedFormData;
}

function clearFormsData() {

}

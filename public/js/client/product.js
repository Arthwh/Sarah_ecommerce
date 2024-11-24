var { actualVariants, variant_images, ...actualProductData } = product
// var cartItems = cart?.items;
// var wishlistItems = wishlist?.items;

const smallScreenImagemCarousel = document.getElementById('carouselCurrentImage')
const miniImageCarousel = document.getElementById('miniImageCarousel');
const scrollUpButton = document.getElementById('scrollUpButton');
const scrollDownButton = document.getElementById('scrollDownButton');
const colorTitle = document.getElementById('colorTitle');
const sizeTitle = document.getElementById('sizeTitle');
const addToCartButton = document.getElementById('addToCartButton');
const wishlistButton = document.getElementById('wishlistButton');

var currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    updateUrl(actualProductData.variant_public_id)
    updateMainImageSmallScreen(currentIndex);
    smallScreenImagemCarousel.classList.remove('hidden');

    clearColorsSelected();
    clearSizesSelected();
    if (!product.total_stock_quantity == 0) {
        markColorSelected(product.variant_public_id);
        if (!product.variant_stock_quantity == 0) {
            markSizeSelected(product.variant_public_id);
        }
    }

    //Adiciona listener para quando a tela carregar e quando houver redimensionamento dela para verificar o overflow do carrossel de imagens
    window.addEventListener('resize', checkCarouselOverflow);
    window.addEventListener('load', checkCarouselOverflow);
});

async function clearSizesSelected() {
    const productSizeComponent = document.getElementById('productSizesComponent')
    productSizeComponent.querySelectorAll('button').forEach(size => {
        if (size.classList.contains('sizeSelected')) {
            size.classList.remove('sizeSelected');
        }
    });
}

async function clearColorsSelected() {
    const productColorVariants = document.getElementById('productColorVariants')
    productColorVariants.querySelectorAll('.colorOption').forEach(div => {
        if (div.classList.contains('colorSelected')) {
            div.classList.remove('colorSelected');
        }
    });
}

//Adiciona uma marca no tamanho selecionado
async function markSizeSelected(sizeSKU) {
    await clearSizesSelected();
    const button = document.getElementById(`productSize_${sizeSKU}`).querySelector('button')
    button.classList.add('sizeSelected');
}

//Adiciona uma marca na cor selecionada
async function markColorSelected() {
    await clearColorsSelected();
    const colorSelectedDiv = document.querySelector(`div[data-variantColor="${actualProductData.variant_color_name}"]`);
    colorSelectedDiv.classList.add('colorSelected');
}

function changeMainImage(newImageUrl, buttonElement) {
    const mainImageVisualizationImage = document.getElementById('mainVisualizationProductImage').querySelector('img')
    mainImageVisualizationImage.src = newImageUrl
    document.getElementById('miniImageCarousel').querySelectorAll('img').forEach(img => {
        img.classList.remove('border');
    });
    buttonElement.querySelector('img').classList.add('border')
}

// Funcoes para controlar o carrossel de imagens dos produtos
function updateMainImageSmallScreen(index) {
    const mainImage = document.querySelector(".imagemProdutoTelaPequena");
    if (mainImage) {
        mainImage.src = variant_images[index];
        smallScreenImagemCarousel.dataset.carouselItemIndex = index
    }
}

function nextImage() {
    currentIndex = (currentIndex + 1) % variant_images.length;
    updateMainImageSmallScreen(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + variant_images.length) % variant_images.length;
    updateMainImageSmallScreen(currentIndex);
}

function scrollCarousel(value) {
    const carousel = document.getElementById('miniImageCarousel');
    carousel.scrollBy({ top: value, behavior: 'smooth' })
}

function checkCarouselOverflow() {
    const isOverflowing = miniImageCarousel.scrollHeight > miniImageCarousel.clientHeight;
    scrollUpButton.style.display = isOverflowing ? 'block' : 'none';
    scrollDownButton.style.display = isOverflowing ? 'block' : 'none';
}

// Requisição AJAX para trocar os dados do produto pelos da variante selecionada
function loadVariantData(button) {
    const parentElement = button.parentElement
    const variantId = parentElement?.dataset.productsku
    const variantType = parentElement?.dataset.varianttype

    fetch(`/api/products/variant/${variantId}?type=${variantType}`)
        .then(response => response.json())
        .then(data => {
            // Atualiza as informações da página com os novos dados da variante
            updateProductInfo(data, variantType, variantId);
        })
        .catch(error => console.error('Erro ao carregar variante:', error));
}

// Função para atualizar as informações do produto no DOM
function updateProductInfo(product, variantType, variantId) {
    images = product.variant_images;
    actualProductData = product;
    const mainImage = document.getElementById('mainVisualizationProductImage').querySelector('img');
    mainImage.src = actualProductData.variant_images[0];
    const productName = document.getElementById('productName');
    productName.innerHTML = `${actualProductData.product_name} ${actualProductData.variant_color_name}`;
    const productPrice = document.getElementById('productPrice');
    productPrice.innerHTML = `R$ ${actualProductData.variant_unit_price}`;
    if (productPrice.classList.contains('hidden')) {
        productPrice.classList.remove('hidden');
    }
    const productDescription = document.getElementById('ProductDescription');
    productDescription.innerHTML = actualProductData.product_description.split('<br>')[0];

    updateMiniImageCarousel();
    updateVariantSizes();
    updateVariantColors();

    smallScreenImagemCarousel.querySelector('img').src = actualProductData.variant_images[0];

    markSizeSelected(actualProductData.variant_public_id);
    markColorSelected(actualProductData.variant_public_id);
    updateUrl(actualProductData.variant_public_id);
    enableShopAndFavoriteButtons();
    removeUnavaliableMessage();
}

function updateMiniImageCarousel() {
    miniImageCarousel.innerHTML = '';
    images.forEach(image => {
        const li = document.createElement('li');
        li.classList.add('flex-shrink-0');
        li.innerHTML = `
        <button onclick="changeMainImage('${image}', this)">
            <img class="w-28 h-auto hover:border border-gray-500" src="${image}" alt="${actualProductData.product_name}">
        </button>`;
        miniImageCarousel.appendChild(li);
    });
}

function updateVariantSizes() {
    sizeTitle.innerHTML = `Tamanho: <b>${actualProductData.variant_size}</b>`

    const sizeVariantsContainer = document.getElementById('productSizesComponent');
    sizeVariantsContainer.innerHTML = '';

    variants.forEach(variant => {
        if (variant.variant_color_name === actualProductData.variant_color_name) {
            const sizeDiv = document.createElement('div');
            sizeDiv.id = `productSize_${variant.variant_public_id}`;
            sizeDiv.dataset.productsku = variant.variant_public_id;
            sizeDiv.dataset.productstock = variant.variant_stock_quantity;
            sizeDiv.dataset.varianttype = 'size';
            const button = document.createElement('button');
            button.className = 'sizeOption';
            button.innerHTML = variant.variant_size;
            if (variant.variant_stock_quantity <= 0) {
                button.disabled = true;
            } else {
                button.onclick = function () {
                    loadVariantData(this);
                };
            }
            sizeDiv.appendChild(button);
            sizeVariantsContainer.appendChild(sizeDiv);
        }
    });
}

function updateVariantColors() {
    colorTitle.innerHTML = `Cor: <b>${actualProductData.variant_color_name}</b>`

    const colorVariantsContainer = document.getElementById('productColorVariants');
    colorVariantsContainer.innerHTML = '';

    const displayedColors = new Set();
    const colorsWithNoStock = new Map();
    variants.forEach(variant => {
        if (!displayedColors.has(variant.variant_color_name)) {
            if (variant.variant_stock_quantity > 0) {
                displayedColors.add(variant.variant_color_name);
                colorsWithNoStock.delete(variant.variant_color_name);

                const colorDiv = document.createElement('div');
                colorDiv.id = `productColor_${variant.variant_public_id}`;
                colorDiv.dataset.productsku = variant.variant_public_id;
                colorDiv.dataset.productstock = variant.variant_stock_quantity;
                colorDiv.dataset.variantcolor = variant.variant_color_name;
                colorDiv.dataset.varianttype = 'color';
                colorDiv.className = 'colorOption'

                const button = document.createElement('button');
                button.title = variant.variant_color_name;
                button.style.backgroundColor = variant.variant_color_code;
                button.onclick = function () {
                    loadVariantData(this)
                };

                colorDiv.appendChild(button);
                colorVariantsContainer.appendChild(colorDiv);
            }
            else {
                colorsWithNoStock.set(variant.variant_color_name, variant);
            }
        }
    });
    colorsWithNoStock.forEach(variant => {
        const colorDiv = document.createElement('div');
        colorDiv.id = `productColor_${variant.variant_public_id}`;
        colorDiv.className = 'rounded-full border border-gray-300 w-10 h-10 bg-white flex justify-center items-center'

        const button = document.createElement('button');
        button.className = 'w-8 h-8 rounded-full cursor-not-allowed';
        button.title = variant.variant_color_name;
        button.style.backgroundColor = variant.variant_color_code;
        button.disabled = true;

        colorDiv.appendChild(button);
        colorVariantsContainer.appendChild(colorDiv);
    });
}

function updateUrl(sku) {
    const url = new URL(window.location.href);
    url.searchParams.set('sku', sku);
    history.pushState(null, "", url.toString());
}

function enableShopAndFavoriteButtons() {
    const favoriteAndShopContainer = document.getElementById('favoriteAndShopContainer');
    favoriteAndShopContainer.classList.remove('disabled');
    favoriteAndShopContainer.querySelectorAll('button').forEach(button => {
        button.disabled = false;
    });
}

function removeUnavaliableMessage() {
    const unavaliableMessage = document.getElementById('unavaliableMessage');
    if (unavaliableMessage) {
        unavaliableMessage.remove();
    }
}

async function addRemoveProductFromWishlist() {
    await addItemToWishlist();
}
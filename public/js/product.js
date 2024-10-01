var { actualVariants, images, ...actualProductData } = product
var cartItems = cart.items;
var wishlistItems = wishlist.items;

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
    // setCookie('cartItems', cartItems, 7);
    // setCookie('wishlistItems', wishlistItems, 7)
    // const cartItemsByCookie = getCookieValue('cartItems');
    // const wishlistItemsByCookie = getCookieValue('wishlistItems');
    // console.log(cartItemsByCookie);
    // console.log(wishlistItemsByCookie);

    updateUrl(actualProductData.sku)
    updateMainImageSmallScreen(currentIndex);
    smallScreenImagemCarousel.classList.remove('hidden');
    // let baseProductId = actualProductData.baseProduct;
    // if (verifyIfProductIsAddedToWishlist(baseProductId)) {
    //     updateWishlistButton('add', baseProductId)
    // } else updateWishlistButton('remove', baseProductId);

    //Seleciona a cor e tamamho do item atual
    markSizeSelected(product.sku);
    markColorSelected(product.sku);

    //Adiciona listener para quando a tela carregar e quando houver redimensionamento dela para verificar o overflow do carrossel de imagens
    window.addEventListener('resize', checkCarouselOverflow);
    window.addEventListener('load', checkCarouselOverflow);
});

//Adiciona uma marca no tamanho selecionado
function markSizeSelected(sizeSKU) {
    const productSizeComponent = document.getElementById('productSizesComponent')
    productSizeComponent.querySelectorAll('button').forEach(size => {
        if (size.classList.contains('sizeSelected')) {
            size.classList.remove('sizeSelected');
        }
    })
    const button = document.getElementById(`productSize_${sizeSKU}`).querySelector('button')
    button.classList.add('sizeSelected')
}

//Adiciona uma marca na cor selecionada
function markColorSelected() {
    const productColorVariants = document.getElementById('productColorVariants')
    productColorVariants.querySelectorAll('div').forEach(div => {
        if (div.classList.contains('border-black')) {
            div.classList.remove('border-black');
            div.classList.add('border-gray-300')
        }
    });
    const colorSelectedDiv = document.querySelector(`div[data-variantColor="${actualProductData.color}"]`);
    console.log(colorSelectedDiv)
    colorSelectedDiv.classList.add('border-black')
    colorSelectedDiv.classList.remove('border-gray-300')
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
        mainImage.src = images[index].url;
        smallScreenImagemCarousel.dataset.carouselItemIndex = index
    }
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateMainImageSmallScreen(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
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

    fetch(`/api/products/updateProductVariant/${variantId}?type=${variantType}`)
        .then(response => response.json())
        .then(data => {
            // Atualiza as informações da página com os novos dados da variante
            updateProductInfo(data, variantType, variantId);
        })
        .catch(error => console.error('Erro ao carregar variante:', error));
}

// Função para atualizar as informações do produto no DOM
function updateProductInfo(product, variantType, variantId) {
    images = product.images
    actualProductData = product

    // Atualiza a imagem principal
    const mainImage = document.getElementById('mainVisualizationProductImage').querySelector('img');
    mainImage.src = actualProductData.images[0].url;

    // Atualiza o nome do produto
    const productName = document.getElementById('productName');
    productName.innerHTML = actualProductData.name;

    // Atualiza o preço
    const productPrice = document.getElementById('productPrice');
    productPrice.innerHTML = `R$ ${actualProductData.price}`;

    // Atualiza a descrição
    const productDescription = document.getElementById('ProductDescription');
    productDescription.innerHTML = actualProductData.description;

    // Atualiza o carrossel de miniaturas
    updateMiniImageCarousel();

    //Atualiza as variantes de tamanho
    updateVariantSizes();
    //Atualiza as variantes de cor
    updateVariantColors();

    //Atualiza as imagens para telas pequenas
    smallScreenImagemCarousel.querySelector('img').src = actualProductData.images[0].url

    //Atualiza o tamanho e cor selecionados
    markSizeSelected(actualProductData.sku)
    markColorSelected(actualProductData.sku)
    updateUrl(actualProductData.sku)
}

function updateMiniImageCarousel() {
    miniImageCarousel.innerHTML = ''; // Limpa as miniaturas atuais
    images.forEach(image => {
        const li = document.createElement('li');
        li.classList.add('flex-shrink-0');
        li.innerHTML = `
        <button onclick="changeMainImage('${image.url}', this)">
          <img class="w-28 h-auto hover:border border-gray-500" src="${image.url}" alt="${actualProductData.name}">
        </button>`;
        miniImageCarousel.appendChild(li);
    });
}

function updateVariantSizes() {
    sizeTitle.innerHTML = `Tamanho: <b>${actualProductData.size}</b>`

    const sizeVariantsContainer = document.getElementById('productSizesComponent');
    sizeVariantsContainer.innerHTML = '';

    variants.forEach(variant => {
        if (variant.colorCode === actualProductData.colorCode) {
            const sizeDiv = document.createElement('div');
            sizeDiv.id = `productSize_${variant.sku}`;
            sizeDiv.dataset.productsku = variant.sku;
            sizeDiv.dataset.productstock = variant.stock;
            sizeDiv.dataset.varianttype = 'size';

            const button = document.createElement('button');
            button.className = 'px-2 py-2 mr-4 w-12 mt-2 border hover:border-black';
            button.innerHTML = variant.size;

            // Verifica o estoque para habilitar/desabilitar o botão
            if (variant.stock <= 0) {
                button.disabled = true;
                button.classList.add('bg-gray-100', 'text-gray-300', 'cursor-not-allowed');
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
    colorTitle.innerHTML = `Cor: <b>${actualProductData.color}</b>`

    const colorVariantsContainer = document.getElementById('productColorVariants');
    colorVariantsContainer.innerHTML = '';

    const displayedColors = new Set();
    const colorsWithNoStock = new Map();
    variants.forEach(variant => {
        if (!displayedColors.has(variant.colorCode)) {
            if (variant.stock > 0) {
                displayedColors.add(variant.colorCode);
                colorsWithNoStock.delete(variant.colorCode);

                const colorDiv = document.createElement('div');
                colorDiv.id = `productColor_${variant.sku}`;
                colorDiv.dataset.productsku = variant.sku;
                colorDiv.dataset.productstock = variant.stock;
                colorDiv.dataset.variantcolor = variant.color;
                colorDiv.dataset.varianttype = 'color';
                colorDiv.className = 'rounded-full border border-gray-300 w-10 h-10 bg-white flex justify-center items-center'

                const button = document.createElement('button');
                button.className = 'w-8 h-8 p-2 rounded-full';
                button.title = variant.color;
                button.style.backgroundColor = variant.colorCode;
                button.onclick = function () {
                    loadVariantData(this)
                };

                colorDiv.appendChild(button);
                colorVariantsContainer.appendChild(colorDiv);
            }
            else {
                colorsWithNoStock.set(variant.colorCode, variant);
            }
        }
    });
    colorsWithNoStock.forEach(variant => {
        const colorDiv = document.createElement('div');
        colorDiv.id = `productColor_${variant.sku}`;
        colorDiv.className = 'rounded-full border border-gray-300 w-10 h-10 bg-white flex justify-center items-center'

        const button = document.createElement('button');
        button.className = 'w-8 h-8 rounded-full cursor-not-allowed';
        button.title = variant.color;
        button.style.backgroundColor = variant.colorCode;
        button.disabled = true;

        colorDiv.appendChild(button);
        colorVariantsContainer.appendChild(colorDiv);
    });
}

// function verifyIfProductIsAddedToWishlist(baseProductId) {
//     if (wishlistItems.length > 0) {
//         wishlistItems.forEach(item => {
//             if (item.baseProduct === baseProductId) {
//                 return true;
//             }
//         });
//     }
// }

// function updateWishlistButton(action, baseProductId) {
//     if (action === 'add') {
//         wishlistButton.querySelector('img').src = '/public/images/icons/favorite_icon_fill_black.svg';
//         wishlistButton.dataset.addedtowishlist = true;

//         wishlistButton.onclick = removeItemFromWishlist(baseProductId)
//         wishlistItems.add(baseProductId);
//         setCookie('wishlistItems', wishlistItems, 7);
//     }
//     if (action === 'remove') {
//         wishlistButton.querySelector('img').src = '/public/images/icons/favorite_icon_border_black.svg';
//         wishlistButton.dataset.addedtowishlist = false;
//         wishlistButton.onclick = addItemToWishlist(baseProductId)
//         wishlistItems.remove(baseProductId);
//         setCookie('wishlistItems', wishlistItems, 7);
//     }
// }

// function addItemToWishlist(baseProductId) {
//     if (verifyIfProductIsAddedToWishlist(baseProductId)) {
//         return "Produto já adicionado na lista de desejos!";
//     }
//     fetch(`/api/wishlist/add/${baseProductId}?user=${user.id}`)
//         .then(response => response.json())
//         .then(data => {
//             updateWishlistButton('add', baseProductId);
//         })
//         .catch(error => console.error('Erro ao adicionar item à wishlist:', error));
// }

// function removeItemFromWishlist(baseProductId) {
//     if (!verifyIfProductIsAddedToWishlist(baseProductId)) {
//         return "Produto já removido da lista de desejos!";
//     }
//     fetch(`/api/wishlist/remove/${baseProductId}?user=${user.id}`)
//         .then(response => response.json())
//         .then(data => {
//             updateWishlistButton('remove', baseProductId);
//         })
//         .catch(error => console.error('Erro ao remover item da wishlist:', error));
// }

function updateUrl(sku) {
    const url = new URL(window.location.href);
    url.searchParams.set('sku', sku); // Adiciona o parâmetro SKU na URL
    history.pushState(null, "", url.toString()); // Atualiza a URL no navegador, sem recarregar a página
}

function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return JSON.parse(decodeURIComponent(parts.pop().split(';').shift()));
    }
    return null;
}

function setCookie(name, value, days) {
    let expires = "";
    // Definir data de expiração, se o parâmetro 'days' for passado
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // dias convertidos para milissegundos
        expires = "; expires=" + date.toUTCString();
    }
    // Definir o cookie com o nome, valor e data de expiração (se fornecido)
    document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + expires + "; path=/";
}


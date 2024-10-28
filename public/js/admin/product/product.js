const productsMenu = document.getElementById('productsMenu');
const productRegisterButton = document.getElementById('productRegisterButton');
const productEditButton = document.getElementById('productEditButton');
const productStockButton = document.getElementById('productStockButton');

document.addEventListener('DOMContentLoaded', function () {
    // Adiciona event listeners aos botões dos submenus
    productRegisterButton.addEventListener('click', renderProductRegister);
    // productEditButton.addEventListener('click', renderProductEdit);
    // productStockButton.addEventListener('click', renderProductStock);
});


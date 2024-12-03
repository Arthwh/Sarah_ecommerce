const mainContentContainer = document.getElementById('mainContentContainer');
const optionVisualizationContainer = document.getElementById('optionVisualizationContainer');
const optionsMenuContainer = document.getElementById('optionsMenuContainer');
const toggleProductsDropdownMenuButton = document.getElementById('toggleProductsDropdownMenuButton');
const toggleOrdersDropdownMenuButton = document.getElementById('toggleOrdersDropdownMenuButton');
const toggleLandingPageDropdownMenuButton = document.getElementById('toggleLandingPageDropdownMenuButton');
const toggleOptionsMenuSmallScreenButton = document.getElementById('toggleOptionsMenuSmallScreenButton');

document.addEventListener('DOMContentLoaded', function () {
    toggleProductsDropdownMenuButton.addEventListener('click', toggleProductsDropdownMenu);
    toggleOrdersDropdownMenuButton.addEventListener('click', toggleOrdersDropdownMenu);
    toggleLandingPageDropdownMenuButton.addEventListener('click', toggleLandingPageDropdownMenu);
    toggleOptionsMenuSmallScreenButton.addEventListener('click', toggleOptionsMenuSmallScreen);
});

function toggleProductsDropdownMenu() {
    productsMenu.classList.toggle('hidden');
}

function toggleOrdersDropdownMenu() {
    ordersMenu.classList.toggle('hidden');
}

function toggleLandingPageDropdownMenu() {
    landingPageMenu.classList.toggle('hidden');
}

function toggleOptionsMenuSmallScreen() {
    optionsMenuContainer.classList.toggle('hidden');
}
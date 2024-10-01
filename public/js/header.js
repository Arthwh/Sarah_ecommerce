const cartCount = cart.totalQuantity || 0;
const cartIcon = document.getElementById('cartIcon')
const favoriteIcon = document.getElementById('favoriteIcon');
const userIcon = document.getElementById('userIcon');

document.addEventListener("DOMContentLoaded", () => {
    if (user && user.logged === 'true') {
        document.getElementById('menuUserOptionsSmallScreen').addEventListener('click', function () {
            const dropdown = document.getElementById('userOptionsDropdown');
            const dropdownButton = document.getElementById('menuUserOptionsSmallScreen');
            const imgElement = dropdownButton.querySelector('img');
            dropdown.classList.toggle('hidden');
            if (!dropdown.classList.contains('hidden')) {
                imgElement.src = "/public/images/icons/close_icon_white.svg";
            } else {
                imgElement.src = "/public/images/icons/menu_icon_white.svg";
            }
        });
        if (cart) {
            setCartCount(cartCount);
            cartIcon.addEventListener('mouseover', () => {
                cartIcon.src = '/public/images/icons/shopping_cart_icon_hover.svg';
                cartIcon.nextElementSibling.classList.remove('bg-white', 'text-black');
                cartIcon.nextElementSibling.classList.add('bg-black', 'text-white');
            });
            cartIcon.addEventListener('mouseout', () => {
                cartIcon.src = '/public/images/icons/shopping_cart_icon.svg';
                cartIcon.nextElementSibling.classList.add('bg-white', 'text-black');
                cartIcon.nextElementSibling.classList.remove('bg-black', 'text-white');
            });
        }
        favoriteIcon.addEventListener('mouseover', () => {
            favoriteIcon.src = '/public/images/icons/favorite_icon_hover.svg';
        });
        favoriteIcon.addEventListener('mouseout', () => {
            favoriteIcon.src = '/public/images/icons/favorite_icon.svg';
        });
        userIcon.addEventListener('mouseover', () => {
            userIcon.src = '/public/images/icons/user_icon_hover.svg';
        });
        userIcon.addEventListener('mouseout', () => {
            userIcon.src = '/public/images/icons/user_icon.svg';
        });
    }
});

function setCartCount(cartCount = 0) {
    if (cartCount > 0) {
        const cartNumber = document.getElementById('cartNumber');
        cartNumber.classList.remove('hidden');
        cartNumber.innerHTML = cartCount;
    }
    else {
        const cartNumber = document.getElementById('cartNumber');
        cartNumber.classList.add('hidden');
        cartNumber.innerHTML = "";
    }
}
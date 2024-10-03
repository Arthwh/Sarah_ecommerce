const cartCount = cart.totalQuantity || 0;


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

function addListenersToUserButtons(cartCount) {
    const cartIcon = document.getElementById('cartIcon')
    const favoriteIcon = document.getElementById('favoriteIcon');
    const userIcon = document.getElementById('userIcon');
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

function editHeaderWithUserInfo(userData) {
    const userControlsContainer = document.getElementById('userControlsContainer');
    userControlsContainer.innerHTML = `<div class="md:hidden relative">
                <button id="menuUserOptionsSmallScreen">
                  <img src="/public/images/icons/menu_icon_white.svg" alt="menuIcon" class="w-8 h-8 mx-auto">
                </button>
                <div id="userOptionsDropdown"
                  class="hidden md:hidden absolute right-0 mt-2 p-4 w-36 bg-black shadow-lg min-h-fit">
                  <a href="/user/${userData.id}/cart" class="block pb-2 text-white menuItem w-fit">Carrinho</a>
                  <a href="/user/${userData.id}/favorites" class="block py-2 text-white menuItem w-fit">Favoritos</a>
                  <a href="/user/${userData.id}/profile" class="block pt-2 text-white menuItem w-fit">Perfil</a>
                </div>
              </div>
              <div class="hidden md:flex relative space-x-6 ">
                <a href="/user/${userData.id}/cart" class="relative inline-block">
                  <img id="cartIcon" src="/public/images/icons/shopping_cart_icon.svg" alt="Carrinho" class="w-8 h-8">
                  <span id="cartNumber"
                    class="hidden absolute top-0 right-0 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black font-bold rounded-full w-4 h-4 flex items-center justify-center text-xs"></span>
                </a>
                <a href="/user/${userData.id}/favorites" class="relative inline-block">
                  <img id="favoriteIcon" src="/public/images/icons/favorite_icon.svg" alt="Favoritos" class="w-8 h-8">
                </a>
                <a href="/user/${userData.id}/profile" class="relative inline-block">
                  <img id="userIcon" src="/public/images/icons/user_icon.svg" alt="Perfil" class="w-8 h-8">
                </a>
              </div>`;

    addListenersToUserButtons(user.cart.count || 0)
}
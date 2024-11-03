const cartCount = cart?.totalQuantity || 0;

document.addEventListener("DOMContentLoaded", () => {
    if (user) {
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
        }
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
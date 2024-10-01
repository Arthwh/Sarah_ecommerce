var activeSubmenu = ''

// Função para alternar a exibição dos submenus de categorias
function toggleSubmenu(id) {
    const submenuContainter = document.getElementById('submenuContainer')
    if (id) {
        const submenu = document.getElementById(id);
        submenu.classList.toggle('hidden');
        submenuContainter.classList.toggle('hidden')
        activeSubmenu = id
        return;
    }
    if (!submenuContainter.classList.contains('hidden') && id == undefined) {
        submenuContainter.classList.add('hidden');
        document.getElementById(activeSubmenu).classList.add('hidden')
    }
}

// Função para abrir/fechar o menu lateral de categorias
function toggleCategoryAsideMenu() {
    const sideMenu = document.getElementById('category-aside-menu');
    const overlay = document.getElementById('categoriesOverlay')
    sideMenu.classList.toggle('hidden');
    overlay.classList.toggle('hidden')
}

//Função para fechar o menu de categorias ao clicar no overlay
function closeCategoriesMenu() {
    document.getElementById('category-aside-menu').classList.add('hidden');
    document.getElementById('submenuContainer').classList.add('hidden');
    if (activeSubmenu != undefined) {
        let submenu = document.getElementById(activeSubmenu)
        if (submenu && !submenu.classList.contains('hidden'))
            document.getElementById(activeSubmenu).classList.add('hidden');
    }
    document.getElementById('categoriesOverlay').classList.add('hidden');
}

//Função para alterar a cor (imagem) da seta dos menus no hover
document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        const arrow = category.nextElementSibling
        if (arrow) {
            category.addEventListener('mouseover', () => {
                arrow.src = '/public/images/icons/arrow_right_icon_E9C495.svg';
            });
            category.addEventListener('mouseout', () => {
                arrow.src = '/public/images/icons/arrow_right_icon_white.svg';
            });
        }
    });
});

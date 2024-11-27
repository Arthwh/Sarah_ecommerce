let activeSubmenu = ''

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

// Função para alternar a exibição dos submenus de categorias
function toggleSubmenu(id) {
    const submenuContainter = document.getElementById('submenuContainer')
    if (id) {
        const submenu = document.getElementById(id);
        submenu.classList.toggle('active');
        submenuContainter.classList.toggle('active')
        activeSubmenu = id
        return;
    }
    if (submenuContainter.classList.contains('active') && id == undefined) {
        submenuContainter.classList.remove('active');
        document.getElementById(activeSubmenu).classList.remove('active')
    }
}

// Função para abrir/fechar o menu lateral de categorias
function toggleCategoryAsideMenu() {
    const sideMenu = document.getElementById('category-aside-menu');
    const overlay = document.getElementById('categoriesOverlay')
    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active')
}

//Função para fechar o menu de categorias ao clicar no overlay
function closeCategoriesMenu() {
    document.getElementById('category-aside-menu').classList.remove('active');
    document.getElementById('submenuContainer').classList.remove('active');
    if (activeSubmenu != undefined) {
        let submenu = document.getElementById(activeSubmenu)
        if (submenu && submenu.classList.contains('active'))
            document.getElementById(activeSubmenu).classList.remove('active');
    }
    document.getElementById('categoriesOverlay').classList.remove('active');
}



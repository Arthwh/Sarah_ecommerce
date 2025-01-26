const filterMenu = document.getElementById("filter-menu");
const toggleFilterMenuButton = document.getElementById("toggleFilterMenuButton");
const nextPageButton = document.getElementById('nextPageButton');
const prevPageButton = document.getElementById('prevPageButton');
const currentPage = pagination.currentPage;
const totalPages = pagination.totalPages;
const limit = pagination.itemsPerPage;
const offset = pagination.offset;

toggleFilterMenuButton?.addEventListener("click", toggleFilterMenu);
nextPageButton?.addEventListener("click", nextPage);
prevPageButton?.addEventListener("click", prevPage);

document.addEventListener('DOMContentLoaded', () => {
    changePageParam();
});

function changePageParam() {
    const url = new URL(window.location.href);
    const page = url.searchParams.get('page');
    if (page != currentPage) {
        url.searchParams.set('page', currentPage);
        window.history.pushState({}, '', url);
    }
}

function toggleFilterMenu() {
    filterMenu.classList?.toggle("active");
}

function updateURL(newPage, newLimit) {
    const url = new URL(window.location.href);
    url.searchParams.set('page', newPage);
    url.searchParams.set('limit', newLimit);
    window.location.href = url;
}

function nextPage() {
    if (currentPage < totalPages) {
        updateURL(currentPage + 1, limit);
    }
}

function prevPage() {
    if (currentPage > 1) {
        updateURL(currentPage - 1, limit);
    }
}

const ordersMenu = document.getElementById('ordersMenu');
const ordersOpenButton = document.getElementById('ordersOpenButton');
const ordersFinishedButton = document.getElementById('ordersFinishedButton');
const ordersAllButton = document.getElementById('ordersAllButton');

document.addEventListener('DOMContentLoaded', function () {
    ordersOpenButton.addEventListener('click', renderOrdersOpen);
    ordersFinishedButton.addEventListener('click', renderOrdersFinished);
    ordersAllButton.addEventListener('click', renderOrdersAll);
});

function renderOrdersOpen() {
    optionVisualizationContainer.innerHTML = '<iframe src="/orders/open" frameborder="0" class="w-full h-full"></iframe>';
};

function renderOrdersFinished() {
    optionVisualizationContainer.innerHTML = '<iframe src="/orders/finished" frameborder="0" class="w-full h-full"></iframe>';
};

function renderOrdersAll() {
    optionVisualizationContainer.innerHTML = '<iframe src="/orders/all" frameborder="0" class="w-full h-full"></iframe>';
};

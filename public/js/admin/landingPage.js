const landingPageMenu = document.getElementById('landingPageMenu');
const alterLandingPageButton = document.getElementById('alterLandingPageButton');
const scheduledChangesLandingPageButton = document.getElementById('scheduledChangesLandingPageButton');
const landingPageHistoryButton = document.getElementById('landingPageHistoryButton');

document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners aos botões dos submenus
    alterLandingPageButton.addEventListener('click', renderAlterLandingPage);
    scheduledChangesLandingPageButton.addEventListener('click', renderScheduledChangesLandingPage);
    landingPageHistoryButton.addEventListener('click', renderLandingPageHistory);
});

// Funções de renderização para Página Inicial
async function renderAlterLandingPage() {
    optionVisualizationContainer.innerHTML = `
        <div class="utility-bar">
            <h2>Edição da página inicial</h2>
            <div class="utility-bar-buttons">
                <button class="action-btn-contrast" onclick="saveChanges()">Salvar</button>
                <button class="action-btn-contrast" onclick="discardChanges()">Descartar</button>
                <button class="action-btn-contrast" onclick="toggleDropdown()">Adicionar Componente</button>
                <div class="dropdown-menu" id="dropdown-menu">
                    <button onclick="addComponent('banner')">Banner</button>
                    <button onclick="addComponent('carousel')">Carrossel</button>
                    <button onclick="addComponent('grid')">Grid</button>
                    <button onclick="addComponent('cards')">Cards</button>
                </div>
            </div>
        </div>
        <iframe id="landingPageIframe" src="/landing-page/edit" frameborder="0" class="w-full h-full"></iframe>
    `;
    disableAllLinks();
}

function renderScheduledChangesLandingPage() {
    optionVisualizationContainer.innerHTML = '<iframe src="/landing-page/scheduled-changes" frameborder="0" class="w-full h-full"></iframe>';
};

function renderLandingPageHistory() {
    optionVisualizationContainer.innerHTML = '<iframe src="/landing-page/history" frameborder="0" class="w-full h-full"></iframe>';
};
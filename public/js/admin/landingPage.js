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
function renderAlterLandingPage() {
    optionVisualizationContainer.innerHTML = '<iframe src="/" frameborder="0" class="w-full h-full"></iframe>';
};

function renderScheduledChangesLandingPage() {
    optionVisualizationContainer.innerHTML = '<iframe src="/landing-page/scheduled-changes" frameborder="0" class="w-full h-full"></iframe>';
};

function renderLandingPageHistory() {
    optionVisualizationContainer.innerHTML = '<iframe src="/landing-page/history" frameborder="0" class="w-full h-full"></iframe>';
};
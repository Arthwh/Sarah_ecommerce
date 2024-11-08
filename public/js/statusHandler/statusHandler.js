async function checkSessionExpired() {
    const response = await fetch("/api/user/session");
    if (response.status === 401) {
        showCentralModal("Sua sessão expirou. Por favor, faça login novamente.", "Sessão expirada", redirectToHome)
    }
}

async function checkUserLogged(){
    const response = await fetch("/api/user/check");
    if (response.status === 401) {
        showCentralModal("Você precisa estar logado para acessar esse recurso.", "Usuário não logado");
        return false;
    }
    return response.user;
}

setInterval(async () => {
    checkSessionExpired();
}, 60000);

function redirectToHome() {
    window.location.href = "/";
}
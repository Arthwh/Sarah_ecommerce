const userLoggedOnLoad = (user !== null && user !== undefined && Object.keys(user).length > 0);
let logged = userLoggedOnLoad;

async function checkSessionExpired() {
    try {
        const user = await fetchUserSession();
        if (!user) {
            logged = false;
            showSessionExpiredModal();
            return false;
        }
        return true;
    } catch (error) {
        console.error('Erro ao verificar sessão', error);
        logged = false;
        showCentralModal("Erro ao verificar sessão", "Não foi possível verificar a sessão atual. Tente novamente mais tarde.", redirectToHome);
        throw Error('Erro ao verificar sessão', error);
    }
}

async function checkUserLogged() {
    try {
        const user = await fetchUserSession();
        if (!user) {
            logged = false;
            showLoginNeddedModal();
            return false;
        }
        return user;
    } catch (error) {
        console.error('Erro ao verificar usuário logado', error);
        logged = false;
        showCentralModal("Erro ao verificar dados do usuário", "Não foi possível verificar os dados do usuário. Tente novamente mais tarde.", redirectToHome);
        throw Error('Erro ao verificar usuário logado', error);
    }
}

async function fetchUserSession() {
    try {
        const response = await fetch("/api/user/check-logged");
        if (!response.ok) {
            throw Error(response.status);
        }
        const data = await response.json();
        if (!data || data.user === undefined) {
            return false;
        }
        return data.user;
    } catch (error) {
        console.error('Erro ao obter dados da sessão', error);
        throw Error('Erro ao obter dados da sessão', error);
    }
}

if (userLoggedOnLoad) {
    setInterval(async () => {
        console.log("Checking session...")
        if (logged) {
            await checkSessionExpired();
        }
    }, 10000);
};

function redirectToHome() {
    window.location.href = "/";
}
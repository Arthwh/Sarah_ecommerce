const userLoggedOnLoad = user !== undefined;
var logged = userLoggedOnLoad;

async function checkSessionExpired() {
    try {
        const user = await fetchUserSession();
        console.log(user)
        if (!user) {
            logged = false;
            console.log("Teste");
            showSessionExpiredModal();
        }
    } catch (error) {
        console.error('Erro ao verificar sessão', error);
        window.reload();
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
        return true;
    } catch (error) {
        console.error('Erro ao verificar usuário logado', error);
        throw Error('Erro ao verificar usuário logado', error);
    }
}

async function fetchUserSession() {
    try {
        const response = await fetch("/api/user/check-logged");
        console.log(response);
        if (!response.ok) {
            throw Error(response.status);
        }
        const data = await response.json();
        console.log(data);
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
import ErrorController from "../controllers/errorController.js";

//Metodo para verificar se o usuario esta logado e tem permissao para visualizar a pagina
export function checkAuth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        const message = "É preciso fazer login para acessar essa página.";
        const title = "Acesso negado"
        ErrorController.renderErrorPage(req, res, message, title);
    }
}

//Metodo para verificar se o usuario é administrador
export function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 3) {
        next();
    } else {
        const message = "Você não tem permissão para acessar essa página.";
        const title = "Acesso negado"
        ErrorController.renderErrorPage(req, res, message, title);
    }
}

// Middleware para verificar sessão e configurar a mensagem de redirecionamento
function sessionChecker(req, res, next) {
    if (!req.session.user) {
        res.locals.redirectMessage = "Sua sessão expirou. Por favor, faça login novamente.";
        res.redirect('/');
    } else {
        next();
    }
}
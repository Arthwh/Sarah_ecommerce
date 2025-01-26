import ErrorController from "../controllers/errorController.js";

//Metodo para verificar se o usuario esta logado e tem permissao para visualizar a pagina
export function checkAuth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        const message = "Você precisa estar logado para acessar esta página.";
        const title = "Acesso restrito";
        const buttonAction = 'toggleLoginModal';
        const buttonText = 'Fazer login';
        const link = '/';
        const linkText = 'Voltar para a página inicial';
        ErrorController.renderUnauthorizedPage(req, res, next, message, title, buttonAction, buttonText, link, linkText);
    }
}

//Metodo para verificar se o usuario é administrador
export function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 3) {
        next();
    } else {
        const message = "Você não tem permissão para acessar essa página.";
        const title = "Acesso negado";
        const buttonAction = null;
        const buttonText = null;
        const link = '/';
        const linkText = 'Voltar para a página inicial';
        ErrorController.renderUnauthorizedPage(req, res, next, message, title, buttonAction, buttonText, link, linkText);
    }
}
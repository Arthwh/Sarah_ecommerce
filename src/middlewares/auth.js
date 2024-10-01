//Metodo para verificar se o usuario esta logado e tem permissao para visualizar a pagina
export function checkAuth(req, res, next) {
    if (req.session.user) {
        // Realizar verificação do token
        // Se for válido, continuar
        next();
    } else {
        // Se não for válido, enviar erro
        res.status(401).send('Unauthorized');
    }
}

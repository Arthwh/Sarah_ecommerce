class AdminController {
    static async getAdminPage(req, res) {
        try {
            const user = req.session.user;
            res.render('admin/adminControlPage', { data: { user: user, page: { displayRegisterModal: false } } })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao carregar a página de admin' });
        }
    }
}

export default AdminController;

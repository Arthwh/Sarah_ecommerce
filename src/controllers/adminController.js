import AdminService from '../services/adminService.js';

class AdminController {
    static async getAdminPage(req, res) {
        try {
            const user = req.session.user;
            res.render('admin/adminControlPage', { data: { user: user, page: { displayRegisterModal: false } } })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao carregar a página de admin' });
        }
    }

    static async saveLangingPage(req, res) {
        const landingPageData = JSON.stringify(req.body.sectionsData);
        const bannerImages = req.files;
        console.log("LandingPage data: ", landingPageData);
        console.log("Banner Images", JSON.stringify(bannerImages));
        res.status(200).json({ message: 'Página inicial salva com sucesso!' })
    }
}

export default AdminController;
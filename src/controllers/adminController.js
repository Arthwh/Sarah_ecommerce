import AdminService from '../services/adminService.js';

class AdminController {
    static async getAdminPage(req, res) {
        try {
            res.render('admin/adminControlPage', {})
        } catch (error) {
            res.status(500).json({ error: 'Erro ao carregar a página de admin' });
        }
    }
}

export default AdminController
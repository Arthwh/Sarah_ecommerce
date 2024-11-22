import AdminService from '../services/adminService.js';
import ProductService from '../services/productService.js';

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
        try {
            const user = req.session.user;
            const landingPageData = JSON.parse(req.body.sectionsData);
            const bannerImages = req.files;
            // console.log("Banner Images", JSON.stringify(bannerImages));
            // console.log(landingPageData)
            await AdminService.saveLandingPageEdits(user, landingPageData, bannerImages);
            res.status(200).json({ message: 'Página inicial salva com sucesso!' })
        } catch (error) {
            res.status(500).json({ message: `Erro ao salvar a página de landing: ${error.message}` });
        }
    }

    static async getSectionElement(req, res) {
        try {
            const data = req.body;
            const sectionData = await ProductService.getSectionData(data);
            const renderData = {
                component: {
                    section_content: sectionData.products, id: data.sectionId, content_type: data.contentType,
                    section_product_type_category_id: data.sectionProductTypeCategoryId, section_product_type_subcategory_id: data.sectionProductTypeSubcategoryId,
                    section_model: data.sectionModel, section_position: data.sectionPosition, section_title: data.sectionTitle, section_product_type: data.sectionProductType,
                    section_product_limit: data.sectionProductLimit, end_date: data.endDate, newComponent: true
                }, mode: 'edit'
            }
            res.render(`client/partials/landingPageComponents/${sectionData.view}`, renderData);
        } catch (error) {
            console.log(`Erro ao carregar a sessão: ${error}`)
            res.status(500).json({ message: `Erro ao carregar a sessão: ${error.message}` });
        }
    }
}

export default AdminController;

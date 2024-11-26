import ProductService from '../services/productService.js';
import LandingPageService from '../services/landingPageService.js';
import { getUserAgent, getUserIP } from '../services/logsService.js';

class LandingPageController {
    static async getLandingPage(req, res) {
        try {
            const mode = req.query.mode || 'main';
            const user = req.session.user;
            const components = await LandingPageService.getLandingPageData(user);
            const categories = await ProductService.getAllProductCategoriesAndSubcategories();

            res.render('client/landingPage', { data: { user: user, components: components, page: { mode: mode, categories: categories, displayRegisterModal: true } } });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao carregar a página inicial' });
        }
    }

    static async saveLangingPage(req, res) {
        try {
            const user = req.session.user;
            const userIP = await getUserIP(req);
            const userAgent = await getUserAgent(req);

            const landingPageData = JSON.parse(req.body.sectionsData);
            const bannerImages = req.files;

            const { message } = await LandingPageService.saveLandingPageEdits(user, userIP, userAgent, landingPageData, bannerImages);
            res.status(200).json({ message: message })
        } catch (error) {
            res.status(500).json({ message: `Erro ao salvar a página de landing: ${error.message}` });
        }
    }

    static async getSectionElement(req, res) {
        try {
            const data = req.body;
            const sectionData = await LandingPageService.getSectionData(data);
            const renderData = {
                component: {
                    section_content: sectionData.products ? sectionData.products : [], id: data.sectionId, content_type: data.contentType,
                    section_product_type_category_id: data.sectionProductTypeCategoryId, section_product_type_subcategory_id: data.sectionProductTypeSubcategoryId,
                    section_model: data.sectionModel, section_position: data.sectionPosition, section_title: data.sectionTitle, section_product_type: data.sectionProductType,
                    section_product_limit: data.sectionProductLimit, end_date: data.endDate, newComponent: true
                }, mode: 'edit'
            }
            res.render(`client/partials/landingPageComponents/${sectionData.view}`, renderData);
        } catch (error) {
            res.status(500).json({ message: `Erro ao carregar a sessão: ${error.message}` });
        }
    }
}

export default LandingPageController;
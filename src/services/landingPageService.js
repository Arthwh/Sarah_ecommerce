import ProductRepository from "../repositories/productRepository.js";
import LandingPageRepository from "../repositories/landingPageRepository.js";
import pool from '../db.js';
import { logAction } from './logsService.js';

class LandingPageService {
    static async getProductsBySectionProductType(sectionProductType, sectionProductLimit, sectionProductTypeCategoryId, sectionProductTypeSubcategoryId) {
        try {
            let products = [];
            switch (sectionProductType) {
                case 'newArrivals':
                    products = await ProductRepository.getProductsByFilter_newArrivals(sectionProductLimit);
                    break;
                case 'highestRated':
                    products = await ProductRepository.getProductsByFilter_highestRated(sectionProductLimit);
                    break;
                case 'bestSelling':
                    console.log('bestSelling')
                    break;
                case 'offers':
                    console.log('offers')
                    break;
                case 'category':
                case 'subcategory':
                    console.log('category or subcategory');
                    products = await ProductRepository.listProductsBySubcategoryRepository('id', sectionProductTypeCategoryId, sectionProductTypeSubcategoryId, sectionProductLimit, 0);
                    break;
            }
            return products;
        } catch (error) {
            console.error('Error getting products by section product type: ' + error);
            throw Error('Error getting products by section product type: ' + error.message);
        }
    }

    static async getSectionData({ sectionModel, sectionProductType, sectionProductLimit, sectionProductTypeCategoryId, sectionProductTypeSubcategoryId }) {
        try {
            if (sectionModel === 'carousel' || sectionModel === 'grid') {
                const products = await this.getProductsBySectionProductType(sectionProductType, sectionProductLimit, sectionProductTypeCategoryId, sectionProductTypeSubcategoryId)
                return { products: products, view: sectionModel === 'carousel' ? 'carousel' : 'itemGrid' };
            }
            else if (sectionModel === 'banner') {
                return { view: 'bannerCarousel' };
            }
            else if (sectionModel === 'cards') {
                return { view: 'linksCards' };
            }
            else throw Error('Section model invalid.')
        } catch (error) {
            console.error(`Error getting section data: ${error}`);
            throw Error(`Error getting section data: ${error.message}`)
        }
    }

    //FUNCIONANDO CERTO (Precisa terminar os tipos de produtos e de sections)
    static async getLandingPageData() {
        try {
            const components = await LandingPageRepository.getActiveLandingPageComponents();
            if (!components) {
                return {};
            };
            for (const component of components) {
                if (component.section_model === 'grid' || component.section_model === 'carousel') {
                    const products = await this.getProductsBySectionProductType(component.section_product_type, component.section_product_limit, component.section_product_type_category_id, component.section_product_type_subcategory_id);
                    component.section_content = products;
                }
                else if (component.section_model === 'banner') {
                    const bannerData = await LandingPageRepository.getBannerComponentData(component.id);
                    component.section_content = bannerData;
                }
                else if (component.section_model === 'cards') {

                }
            }
            return components;
        } catch (error) {
            console.error('Error getting LandingPage data: ' + error);
            throw Error('Error getting LandingPage data: ' + error.message);
        }
    }

    //FUNCIONAL MAS NAO ESTA PRONTA
    static async saveLandingPageEdits(user, userIP, userAgent, landingPageData, bannerImages) {
        const client = await pool.connect();
        try {
            if (!landingPageData) {
                throw Error('Landing page data is required.');
            }
            await client.query('BEGIN');
            for (const section of landingPageData.sectionsData) {
                console.log(section)
                let sectionValidated = validateSectionData(section);
                await LandingPageRepository.saveLandingPageComponent(client, sectionValidated);
                if (section.componentSectionModel === 'banner') {
                    const banners = section.banners;
                    console.log(bannerImages)
                    console.log(banners);
                    // await LandingPageRepository.setBannerComponentData(client, section.componentId, banners);
                }
            }
            // const oldLandingPageData = await LandingPageRepository.getActiveLandingPageComponents();
            // const newLandingPageData = { ...oldLandingPageData, ...landingPageData }
            // console.log(landingPageData);
            // console.log(bannerImages);
            let message = 'Página inicial salva com sucesso!';
            logAction(userIP, userAgent, 'landingPage-edit', { status: 'success', details: message }, user.id);
            await client.query('COMMIT');
            return { message }
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error while saving landing page: ' + error);
            logAction(userIP, userAgent, 'landingPage-edit', { status: 'error', details: error.message });
            throw new Error('Error while saving landing page: ' + error.message)
        }
    }
}

function validateSectionData(section) {
    console.log(section)
    if (section.endDate === '') {
        console.log("teste")
        section.endDate = null
    }
    if (section.productTypeCategory === '') {
        section.productTypeCategory = null
    }
    if (section.productTypeSubcategory === '') {
        section.productTypeSubcategory = null
    }
    if (section.newComponent === 'true') {
        section.componentId = 0;
    }
    return section;
}

export default LandingPageService;
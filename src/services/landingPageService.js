import ProductRepository from "../repositories/productRepository.js";
import LandingPageRepository from "../repositories/landingPageRepository.js";
import WishlistService from "./wishlistService.js";
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
                    products = await ProductRepository.getProductsByFilter_bestSelling(sectionProductLimit);
                    break;
                case 'offers':
                    products = await ProductRepository.getProductsByFilter_offers(sectionProductLimit);
                    break;
                case 'category':
                case 'subcategory':
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

    //FUNCIONANDO CERTO
    static async getLandingPageData(user = null) {
        try {
            const components = await LandingPageRepository.getActiveLandingPageComponents();
            if (!components) {
                return {};
            };
            for (const component of components) {
                if (component.section_model === 'grid' || component.section_model === 'carousel') {
                    const products = await this.getProductsBySectionProductType(component.section_product_type, component.section_product_limit, component.section_product_type_category_id, component.section_product_type_subcategory_id);
                    console.log(products)
                    user ? component.section_content = await WishlistService.checkProductsInWishlist(user, products) : component.section_content = products;
                }
                else if (component.section_model === 'banner' || component.section_model === 'cards') {
                    const images = await LandingPageRepository.getActiveLandingPageImages(component.id);
                    component.section_content = images;
                }
            }
            return components;
        } catch (error) {
            console.error('Error getting LandingPage data: ' + error);
            throw Error('Error getting LandingPage data: ' + error.message);
        }
    }

    //FUNCIONAL MAS NAO ESTA PRONTA
    static async saveLandingPageEdits(user, userIP, userAgent, landingPageData, images) {
        const client = await pool.connect();
        try {
            if (!landingPageData) {
                throw Error('Landing page data is required.');
            }
            const imagesMap = await createImageMap(images);
            const { componentsToDeactivate, componentsToUpdate, componentsToAdd } = await this.compareLandingPageComponentsChanges(landingPageData.sectionsData);
            await client.query('BEGIN');
            await Promise.all([
                this.addLandingPageComponents(client, componentsToAdd, imagesMap),
                this.updateLandingPageCompoenents(client, componentsToUpdate, imagesMap),
                this.deactivateLandingPageComponents(client, componentsToDeactivate)
            ]);
            let message = 'Página inicial salva com sucesso!';
            logAction(userIP, userAgent, 'landingPage-edit', { status: 'success', details: message }, user.id);
            await client.query('COMMIT');
            return { message }
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error while saving landing page: ' + error);
            logAction(userIP, userAgent, 'landingPage-edit', { status: 'error', details: error.message });
            throw new Error('Error while saving landing page: ' + error.message)
        } finally {
            client.release();
        }
    }

    static async compareLandingPageComponentsChanges(newLandingPageComponentsData) {
        const oldLandingPageComponentsData = await LandingPageRepository.getActiveLandingPageComponents();

        const componentsToDeactivate = [];
        const componentsToUpdate = [];
        const componentsToAdd = [];
        const newLandingPageComponentsMap = new Map(newLandingPageComponentsData.map(item => [parseInt(item.componentId), item]));
        const oldLandingPageComponentsMap = new Map(oldLandingPageComponentsData.map(item => [parseInt(item.id), item]));

        oldLandingPageComponentsData.forEach(oldComponent => {
            if (!newLandingPageComponentsMap.has(oldComponent.id)) {
                componentsToDeactivate.push(oldComponent);
            }
            else {
                componentsToUpdate.push(newLandingPageComponentsMap.get(oldComponent.id));
            }
        });

        newLandingPageComponentsData.forEach(newComponent => {
            if (!oldLandingPageComponentsMap.has(parseInt(newComponent.componentId))) {
                componentsToAdd.push(newComponent);
            }
        });

        return {
            componentsToDeactivate,
            componentsToUpdate,
            componentsToAdd
        };
    }

    static async compareLandingPageImagesChanges(componentId, newLandingPageImagesData) {
        const oldLandingPageImagesData = await LandingPageRepository.getActiveLandingPageImages(componentId);

        const imagesToDeactivate = [];
        const imagesToAdd = [];
        const newLandingPageImagesMap = new Map(newLandingPageImagesData.map(item => [parseInt(item.id), item]));
        const oldLandingPageImagesMap = new Map(oldLandingPageImagesData.map(item => [parseInt(item.id), item]));

        oldLandingPageImagesData.forEach(oldImage => {
            if (!newLandingPageImagesMap.has(oldImage.id)) {
                imagesToDeactivate.push(oldImage);
            }
        });

        newLandingPageImagesData.forEach(newImage => {
            if (!oldLandingPageImagesMap.has(parseInt(newImage.id))) {
                imagesToAdd.push(newImage);
            }
        });

        return {
            imagesToAdd,
            imagesToDeactivate
        };
    }

    static async addLandingPageComponents(client, components, images) {
        try {
            for (const component of components) {
                const componentValidatedData = await validateSectionData(component);
                const id = await LandingPageRepository.addLandingPageComponent(client, componentValidatedData);
                if (component.componentSectionModel === 'banner' || component.componentSectionModel === 'cards') {
                    const updatedImagesToAdd = component.banners.map((item) => ({
                        ...item,
                        imageLargePath: images[item.imageLargeId],
                        imageSmallPath: images[item.imageSmallId],
                    }));
                    for (const image of updatedImagesToAdd) {
                        if (image.endDate === '') image.endDate = null;
                        await LandingPageRepository.setLandingPageImages(client, id, image);
                    }
                }
            }
        } catch (error) {
            console.error('Error adding components: ', error);
            throw Error('Error adding components: ', error.message);
        }
    }

    static async updateLandingPageCompoenents(client, components, images) {
        try {
            for (const component of components) {
                const componentValidatedData = await validateSectionData(component);
                await LandingPageRepository.updateLandingPageComponent(client, componentValidatedData);
                if (component.componentSectionModel === 'banner' || component.componentSectionModel === 'cards') {
                    const { imagesToAdd, imagesToDeactivate } = await this.compareLandingPageImagesChanges(component.componentId, component.banners);
                    if (imagesToAdd) {
                        const updatedImagesToAdd = imagesToAdd.map((item) => ({
                            ...item,
                            imageLargePath: images[item.imageLargeId],
                            imageSmallPath: images[item.imageSmallId],
                        }));
                        for (const image of updatedImagesToAdd) {
                            if (image.endDate === '') image.endDate = null;
                            await LandingPageRepository.setLandingPageImages(client, component.componentId, image);
                        }
                    }
                    if (imagesToDeactivate) {
                        for (const image of imagesToDeactivate) {
                            await LandingPageRepository.deactivateLandingPageImagesById(client, image.id);
                        };
                    }
                }
            }
        } catch (error) {
            console.error('Error updating components: ', error);
            throw Error('Error updating components: ', error.message);
        }
    }

    static async deactivateLandingPageComponents(client, components) {
        try {
            for (const component of components) {
                await LandingPageRepository.deactivateLandingPageComponent(client, component.id);
                if (component.section_model === 'banner' || component.section_model === 'cards') {
                    await LandingPageRepository.deactivateLandingPageImagesByLandingPageComponentId(client, component.id)
                }
            }
        } catch (error) {
            console.error('Error deactivating components: ', error);
            throw Error('Error deactivating components: ', error.message);
        }
    }
}

async function createImageMap(images) {
    return images.reduce((map, img) => {
        const id = img.fieldname.match(/\[(\d+)\]/)?.[1];
        if (id) {
            map[id] = `../public/images/banners/${img.originalname}`;
        }
        return map;
    }, {});
}

function validateSectionData(section) {
    if (section.endDate === '') {
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
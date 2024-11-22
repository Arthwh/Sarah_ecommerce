import AdminModel from '../models/adminModel.js'
import LandingPageRepository from '../repositories/landingPageRepository.js';
import pool from '../db.js'

class AdminService {
    static async saveLandingPageEdits(user, landingPageData, bannerImages) {
        const client = await pool.connect();
        try {
            if (!landingPageData) {
                return { status: 400, message: 'Landing page data is required.' }
            }
            await client.query('BEGIN');
            for (const section of landingPageData.sectionsData) {
                console.log(section)
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
                await LandingPageRepository.saveLandingPageComponent(client, section);
                if (section.componentSectionModel === 'banner') {
                    const banners = section.banners;
                    // console.log(banners)
                }
            }
            // const oldLandingPageData = await LandingPageRepository.getActiveLandingPageComponents();
            // const newLandingPageData = { ...oldLandingPageData, ...landingPageData }
            // console.log(landingPageData);
            // console.log(bannerImages);
            await client.query('COMMIT')
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error while saving landing page: ' + error);
            throw new Error('Error while saving landing page: ' + error.message)
        }
    }
}

export default AdminService
import multer from 'multer';
import fs from 'fs';

function ensureDirectoryExistence(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const productPath = 'public/images/products';
        ensureDirectoryExistence(productPath); 
        cb(null, productPath); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
export const uploadProduct = multer({ storage: storage });

const bannerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const bannerPath = 'public/images/banners';
        ensureDirectoryExistence(bannerPath);
        cb(null, bannerPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const uploadBanner = multer({ storage: bannerStorage });
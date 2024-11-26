import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Função auxiliar para verificar e criar pasta
function ensureDirectoryExistence(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

// Configuração para upload de imagens de produtos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const productPath = 'public/images/products';
        ensureDirectoryExistence(productPath);  // Garante que a pasta existe
        cb(null, productPath);  // Pasta onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
// Inicializar o upload com a configuração de armazenamento
export const uploadProduct = multer({ storage: storage });

// Configuração para upload de imagens de banners
const bannerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const bannerPath = 'public/images/banners';
        ensureDirectoryExistence(bannerPath);  // Garante que a pasta existe
        cb(null, bannerPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const uploadBanner = multer({ storage: bannerStorage });
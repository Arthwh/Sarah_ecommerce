import multer from 'multer';

//Configurações do multer para rebecer imagens do frontend
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products');  // Pasta onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
        const uniqueId = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueId + '-' + file.originalname);
    }
});
// Inicializar o upload com a configuração de armazenamento
const upload = multer({ storage: storage });

export default upload;
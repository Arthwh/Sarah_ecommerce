import path from 'path'
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';

import userRoutes from "./routes/userRoutes.js"
import productRoutes from './routes/productRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

const __filename = fileURLToPath(import.meta.url); // Obtém o caminho completo do arquivo atual
const __dirname = path.dirname(__filename); // Obtém o diretório atual a partir do caminho
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Sessão do usuário
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 }
}));

//Configura os arquivos de rotas
app.use(userRoutes)
app.use(adminRoutes);
app.use(productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app

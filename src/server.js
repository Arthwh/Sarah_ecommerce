import path from 'path'
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';

import userRoutes from "./routes/userRoutes.js"
import productRoutes from './routes/productRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config();

const app = express(); // inicia o servidor
const port = process.env.SERVER_PORT || 3000; //Obtem o numero da porta do arquivo .env, ou atribui 3000 se nao tiver outro valor

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
  cookie: { secure: false, maxAge: 1800000 }
}));

//Configura os arquivos de rotas
app.use(userRoutes)
app.use(productRoutes);
app.use(adminRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app

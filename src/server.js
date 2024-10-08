import path from 'path'
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session'

import userRoutes from "./routes/userRoutes.js"
import productRoutes from './routes/productRoutes.js'
dotenv.config();

const app = express(); // inicia o servidor
const port = process.env.SERVER_PORT || 3000; //Obtem o numero da porta do arquivo .env, ou atribui 3000 se nao tiver outro valor

const __filename = fileURLToPath(import.meta.url); // Obtém o caminho completo do arquivo atual
const __dirname = path.dirname(__filename); // Obtém o diretório atual a partir do caminho
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(express.json());

//Sessão do usuário
app.use(session({
  secret: 'token',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

//Configura os arquivos de rotas
app.use('/api', userRoutes)
app.use('/api', productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';

import userRoutes from "./routes/userRoutes.js";
import productRoutes from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import landingPageRoutes from './routes/landingPageRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use(userRoutes);
app.use(authRoutes);
app.use(landingPageRoutes);
app.use(adminRoutes);
app.use(productRoutes);
app.use(wishlistRoutes);
app.use(addressRoutes);
app.use(orderRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app

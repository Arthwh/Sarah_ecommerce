import express from 'express'
import dotenv from 'dotenv'
import session from 'express-session'
import userRoutes from "./routes/userRoutes.js"
import productRoutes from './routes/productRoutes.js'
dotenv.config();

const app = express(); // inicia o servidor
const port = process.env.SERVER_PORT || 3000; //Obtem o numero da porta do arquivo .env, ou atribui 3000 se nao tiver outro valor

// Configura para conseguir servir arquivos estáticos 
app.use(express.static('./src/views'));
app.use(express.static('./public'));

//Configura a template engine que vai carregar as views
app.set('view engine', 'pug')

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

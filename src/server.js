import express from 'express';
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes.js"
dotenv.config();

const app = express(); // inicia o servidor
const port = process.env.SERVER_PORT || 3000; //Obtem o numero da porta do arquivo .env, ou atribui 3000 se nao tiver outro valor

// Configura para conseguir servir arquivos estáticos 
app.use(express.static('./src/views'));
app.use(express.static('./public'));

//Configura a template engine que vai carregar as views
app.set('view engine', 'pug')

//Configura os arquivos de rotas
app.use(userRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app

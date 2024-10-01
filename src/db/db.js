// Importação de módulos
import * as dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

// inicia .env config
dotenv.config()

// Cria uma nova pool com variáveis .env
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

export default pool
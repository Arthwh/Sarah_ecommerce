// db.js
import pg from "pg";
const { Pool } = pg;

// Configurar o pool de conexão
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'a',
    password: 'postgres',
    port: 5432,
});

export default pool;
import Pool from "pg";
import dotEnv from "dotenv";
dotEnv.config();
export const pool = new Pool.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

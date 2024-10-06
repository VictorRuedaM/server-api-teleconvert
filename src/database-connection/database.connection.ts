import { Pool } from "pg";

const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;
const DB_PORT = process.env.DB_PORT || 5432

export const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: +DB_PORT,
  ssl: true,
})
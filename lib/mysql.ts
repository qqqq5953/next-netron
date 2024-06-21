// import mysql from 'mysql2/promise';
import mysql, { type PoolConnection } from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true
})

export async function withDbConnection<T>(
  callback: (db: PoolConnection) => Promise<T>
): Promise<T> {
  const db = await pool.getConnection();
  try {
    return await callback(db);
  } finally {
    db.release();
  }
};

export default pool
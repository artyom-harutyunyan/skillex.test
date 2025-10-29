import mysql from "mysql2/promise";
import { DB_NAME, DB_HOST, DB_PASSWORD, DB_USER } from "./utils/variables";

export const database = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const connect = async () => {
    try {
      const connection = await database.getConnection();
      console.log("Database connected successfully!");
      connection.release();
    } catch (error) {
      console.error("Database connection failed:", error);
    }
}

import { Pool } from "pg";
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("error", (error: Error) => {
  console.error("Unexpected PostgreSQL error:", error);
});

export default pool;

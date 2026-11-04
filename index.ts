import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./src/config/db";
import employeeRoutes from "./src/routes/employee.routes"

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", employeeRoutes);

const port = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    await pool.query("SELECT 1");

    console.log("DB connected successfully");


    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
}

startServer();
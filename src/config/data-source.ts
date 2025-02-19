import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import "reflect-metadata"

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "expense_tracker",
  password: process.env.DB_PASSWORD || "expense_tracker",
  database: process.env.DB_NAME || "expense_tracker",
  synchronize: true, // Set to false in production
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
});

AppDataSource.initialize()
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log("Database connection error:", error));

import dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";
dotenv.config();
const SOURCE_PATH = process.env.NODE_ENV === "production" ? "dist" : "src";

export const config = {
  name: "default",
  type: "postgres",
  host: process.env.PG_HOST,
  port: 5432,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  synchronize: true,
  logging: false,
  entities: [`${SOURCE_PATH}/entities/*.entity{.ts,.js}`],
  migrations: [`${SOURCE_PATH}/migrations/*.migration{.ts,.js}`],
  cli: {
    entitiesDir: `${SOURCE_PATH}/entities`,
    migrationsDir: `${SOURCE_PATH}/migrations`,
  },
} as ConnectionOptions;

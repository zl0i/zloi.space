import "reflect-metadata";
import { DataSource } from "typeorm";

const DB_HOST = process.env['DB_HOST'] ?? 'localhost'
const DB_NAME = process.env['DB_NAME'] ?? 'zloi'
const DB_USERNAME = process.env['DB_USERNAME'] ?? 'postgres'
const DB_PASSWORD = process.env['DB_PASSWORD'] ?? 'admin'


export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [
        "./entity/*[.ts]"
    ],
    migrations: [
        "./entity/migrations/*[.ts]"
    ],
    migrationsRun: true,
    synchronize: true
})

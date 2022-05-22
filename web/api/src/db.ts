import { Sequelize } from "sequelize";

const DB_HOST = process.env['DB_HOST'] ?? "localhost"
const DB_NAME = process.env['DB_NAME'] ?? "zloi"
const DB_USERNAME = process.env['DB_USERNAME'] ?? "postgres"
const DB_PASSWORD = process.env['DB_PASSWORD'] ?? "admin"

const isDev = process.env['NODE_ENV'] != 'production'

export const sequelize = new Sequelize({
    database: DB_NAME,
    dialect: "postgres",
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    logging: isDev ? console.log : false
})

import { Sequelize } from "sequelize";

const DB_HOST = process.env['DB_HOST']
const DB_NAME = process.env['DB_NAME']
const DB_USERNAME = process.env['DB_USERNAME']
const DB_PASSWORD = process.env['DB_PASSWORD']

const isDev = process.env['NODE_ENV'] != 'production'

export const sequelize = new Sequelize({
    database: DB_NAME,
    dialect: "postgres",
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    logging: isDev ? console.log : false
})

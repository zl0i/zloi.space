import axios from "axios"
import fs from "fs"
import { join, sep, resolve } from "path"
import { Books } from "../entity/books.entity"
import { sequelize } from "./db"



export async function initBooks() {
    const file = fs.readFileSync(join(resolve(".") + sep + "configs" + sep + "books.json"))
    const books = JSON.parse(file.toString())
    const t = await sequelize.transaction();
    try {
        await Books.destroy({ where: {}, transaction: t })
        for (let i = 0; i < books.length; i++) {
            const book = books[i]
            const { data } = await axios.get(book.url)
            await Books.create({
                id: i,
                name: book.name,
                icon: data.volumeInfo.imageLinks.medium,
                status: book.status,
                description: data.volumeInfo.description
            }, { transaction: t })
        }
        await t.commit()
    } catch (error) {
        console.log(error)
        await t.rollback();
    }
}

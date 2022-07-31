import axios from 'axios'
import { Books, BookStatus } from '../entity/books.entity'

export class BooksService {

    static async get() {
        return await Books.find() ?? []
    }

    static async create(link: string) {
        const { data } = await axios.get(link)
        const book = new Books()
        book.name = data.volumeInfo.title
        book.infoLink = link
        book.icon = data.volumeInfo.imageLinks.thumbnail
        book.status = BookStatus.UNREAD
        book.description = data.volumeInfo.description
        await book.save()
        return true
    }

    static async update(id: number, status: BookStatus) {
        if (!Object.values(BookStatus).includes(status)) {
            throw new Error("undefined status")
        }
        const data = await Books.update({ id }, { status })
        if (data.affected == 0) {
            throw new Error("not affected")
        }
        return true
    }

    static async delete(id: number) {
        await Books.delete({ id })
        return true
    }
}
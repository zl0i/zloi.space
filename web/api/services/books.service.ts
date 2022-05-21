import { Books } from '../entity/books.entity'

export class BooksService {

    static async get() {
        return await Books.findAll() ?? []
    }
}
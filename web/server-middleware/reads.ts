import { ServerMiddleware } from '@nuxt/types'
import axios from 'axios'

interface IBook {
    id: string;
    name: string;
    image: string;
    status: string;
}
let books: IBook[] = []

setTimeout(() => {
    updateBooks()
}, 1000)

const serverMiddleware: ServerMiddleware = function (req, res, next) {
    if (req.url == '/') {
        res.setHeader("Content-Type", "application/json")
        return res.end(JSON.stringify(books))
    }
    next()
}
//TODO: rewrite as plugin
async function updateBooks() {
    let arr: IBook[] = []
    const listBook = await axios.get("http://localhost:3000/reads.json")
    for (const book of listBook.data) {
        const gBook = await axios.get(book.link)
        arr.push({
            id: gBook.data.id,
            name: gBook.data.volumeInfo.title,
            image: gBook.data.volumeInfo?.imageLinks?.thumbnail,
            status: book.read,
        })
    }
    const read = arr.filter((item) => item.status == "read").sort(sortByName);
    const reading = arr.filter((item) => item.status == "reading").sort(sortByName);
    const unread = arr.filter((item) => item.status == "unread").sort(sortByName);
    books = Array.of(...read, ...reading, ...unread)
}

function sortByName<T extends { name: string }>(a: T, b: T) {
    return a.name.localeCompare(b.name);
}


export default serverMiddleware
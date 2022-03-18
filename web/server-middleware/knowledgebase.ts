import { ServerMiddleware } from '@nuxt/types'
import axios from 'axios'
import marked from "../src/marked"

export interface IInstruction {
    id: string;
    name: string;
    html: string;
}

interface IBook {
    id: string;
    name: string;
    image: string;
    status: string;
}

let instructions: IInstruction[] = []
let books: IBook[] = []

setTimeout(() => {
    updateInstructions()
    updateBooks()
}, 1000)

const serverMiddleware: ServerMiddleware = function (req, res, next) {
    console.log(req.url)
    if (req.url == '/knowledgebase/push') {
        console.log("updateInstructions")
        updateInstructions()
        return res.end()
    } else if (req.url == '/knowledgebase') {
        res.setHeader("Content-Type", "application/json")
        return res.end(JSON.stringify(instructions))
    } else if (req.url == '/reads') {
        res.setHeader("Content-Type", "application/json")
        return res.end(JSON.stringify(books))
    }
    next()
}

export default serverMiddleware

async function updateInstructions() {
    console.log("start updateInstructions")
    const contents = await axios.get("https://api.github.com/repos/zl0i/KnowledgeBase/contents")
    const arr: IInstruction[] = []
    for (const file of contents.data) {
        if (!file.name.includes(".md")) {
            continue
        }
        const res = await axios.get(file.download_url)
        arr.push({
            id: file.sha,
            name: file.name,
            html: marked(res.data),
        })
    }
    console.log("end updateInstructions")
    instructions = arr.sort((a, b) => a.name.localeCompare(b.name));
}

async function updateBooks() {
    console.log("start updateBooks")
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
    console.log("end updateBooks")
}

function sortByName<T extends { name: string }>(a: T, b: T) {
    return a.name.localeCompare(b.name);
}


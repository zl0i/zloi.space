import axios from 'axios'
import marked from "../src/marked"

let initDb = false
if (!initDb) {
    console.log("init....")
    initDb = true;
}

export interface IBook {
    id: string;
    name: string;
    image: string;
    status: string;
}

export interface IInstruction {
    id: string;
    name: string;
    html: string;
}

console.log("tut")
let books: IBook[] = []
let instructions: IInstruction[] = []

export async function getBooks() {
    return books;
}

export async function getInstructions() {
    return instructions;
}

async function initUpdate() {
    try {
        await updateBooks()
        await updateInstructions()
    } catch (error) {
        console.log(error)
    }
}

//TODO: rewrite as plugin
export async function updateBooks() {
    console.log("updateBooks start")
    let arr: IBook[] = []
    const listBook = await axios.get("http://localhost:3000/reads.json") //TODO: read as file
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
    console.log("updateBooks finished")
}

function sortByName<T extends { name: string }>(a: T, b: T) {
    return a.name.localeCompare(b.name);
}

//TODO: rewrite as plugin
export async function updateInstructions() {
    console.log("updateInstructions start")
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
    instructions = arr.sort((a, b) => a.name.localeCompare(b.name));
    console.log("updateInstructions finished")
}
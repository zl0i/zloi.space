import { ServerMiddleware } from '@nuxt/types'
import axios from 'axios'
import marked from "../src/marked"

export interface IInstruction {
    id: string;
    name: string;
    html: string;
}

let instructions: IInstruction[] = []

const serverMiddleware: ServerMiddleware = function (req, res, next) {
    console.log(req.url, req.headers)
    if (req.url == '/knowledgebase/push') {
        console.log("updateInstructions")
        updateInstructions()
        return res.end()
    }
    next()
}

export default serverMiddleware

async function updateInstructions() {
    const contents = await axios.get("https://api.github.com/repos/zl0i/KnowledgeBase/contents")
    const arr: IInstruction[] = []
    for (const file of contents.data) {
        const res = await axios.get(file.download_url)
        arr.push({
            id: file.sha,
            name: file.name,
            html: marked(res.data),
        })
    }
    console.log(arr)
    instructions = arr
}

export function getInstructions() {
    return instructions;
}


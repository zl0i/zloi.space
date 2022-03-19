import { ServerMiddleware } from '@nuxt/types'
import axios from 'axios'
import marked from "../src/marked"

export interface IInstruction {
    id: string;
    name: string;
    html: string;
}

let instructions: IInstruction[] = []

setTimeout(() => {
    updateInstructions()
}, 1000)

const serverMiddleware: ServerMiddleware = function (req, res, next) {
    if (req.url == '/') {
        res.setHeader("Content-Type", "application/json")
        return res.end(JSON.stringify(instructions))
    } else if (req.url == '/push') {
        updateInstructions()
        return res.end()
    }
    next()
}
//TODO: rewrite as plugin
async function updateInstructions() {
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
}

export default serverMiddleware


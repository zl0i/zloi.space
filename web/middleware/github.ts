import { ServerMiddleware } from '@nuxt/types'
import axios from 'axios'
import marked from "../src/marked"

export interface IInstruction {
    id: string;
    name: string;
    html: string;
}

let instructions: IInstruction[] = []
updateInstructions()

const serverMiddleware: ServerMiddleware = function (req, res, next) {
    console.log(req.url)
    if (req.url == '/knowledgebase/push') {
        console.log("updateInstructions")
        updateInstructions()
        return res.end()
    } else if (req.url == '/knowledgebase') {
        res.setHeader("Content-Type", "application/json")
        return res.end(JSON.stringify(instructions))
    }
    next()
}

export default serverMiddleware

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
    console.log("end")
    instructions = arr.sort((a, b) => a.name.localeCompare(b.name));
}


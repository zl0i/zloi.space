import { Instructions } from "../entity/instructions.entity";
import axios from 'axios'
import marked from "../src/marked";


export class InstructionsService {

    static async get() {
        const data = await Instructions.find({ select: ['id', 'name', "html"] }) ?? []
        return data.sort((a, b) => a.name.localeCompare(b.name))
    }

    static async update() {
        const contents = await axios.get("https://api.github.com/repos/zl0i/KnowledgeBase/contents")
        for (let i = 0; i < contents.data.length; i++) {
            const file = contents.data[i]
            if (!file.name.includes(".md")) {
                continue
            }
            const res = await axios.get(file.download_url)
            await Instructions.upsert({ name: file.name, markdown: res.data, html: marked(res.data) }, { conflictPaths: ['name'] })
        }
        return true
    }
}

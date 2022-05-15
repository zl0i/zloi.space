import axios from 'axios'
import { sequelize } from './db'
import { Instructions } from '../entity/instructions.entity'
import marked from "./marked"

export async function updateInstructions() {
    const t = await sequelize.transaction();
    try {
        await Instructions.destroy({ where: {}, transaction: t })
        const contents = await axios.get("https://api.github.com/repos/zl0i/KnowledgeBase/contents")
        for (let i = 0; i < contents.data.length; i++) {
            const file = contents.data[i]
            if (!file.name.includes(".md")) {
                continue
            }
            const res = await axios.get(file.download_url)
            await Instructions.create({
                id: i,
                name: file.name,
                markdown: res.data,
                html: marked(res.data)
            }, { transaction: t })
        }
        await t.commit()
    } catch (error) {
        console.log(error)
        await t.rollback();
    }
}
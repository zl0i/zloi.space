import axios from "axios"
import fs from "fs"
import { join, sep, resolve } from "path"
import { Summary } from "../entity/summary.entity"
import { sequelize } from "./db"



export async function initSummary() {
    const file = fs.readFileSync(join(resolve(".") + sep + "summary.json"))
    const summary = JSON.parse(file.toString())
    const t = await sequelize.transaction();
    try {
        await Summary.destroy({ where: {}, transaction: t })
        let count = 1;
        for (let i = 0; i < summary.length; i++) {
            const info = summary[i]
            const lang = info.lang
            const position = info.position
            delete info.lang
            delete info.position
            const keys = Object.keys(info)
            for (let j = 0; j < keys.length; j++, count++) {
                const k = keys[j]
                await Summary.create({
                    id: count,
                    key: k,
                    language: lang,
                    position: position,
                    value: info[k]
                }, { transaction: t })
            }
        }
        await t.commit()
    } catch (error) {
        console.log(error)
        await t.rollback();
    }
}
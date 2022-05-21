import { Summary } from '../entity/summary.entity'

export class SummaryService {

    static async get(position: string, lang: string) {
        const summary = await Summary.findAll({
            where: {
                position: position,
                language: lang
            }
        }) ?? []
        const result: any = {}
        for (const item of summary) {
            result[item.key] = item.value
        }
        return result
    }
}
import { Summary } from '../entity/summary.entity'
import { AppDataSource } from '../src/db'

export class SummaryService {

    static async get(lang: string) {
        const summary = await Summary.find({ where: { language: lang } }) ?? []
        const result: any = {}
        for (const item of summary) {
            result[item.key] = item.value
        }
        result.lang = lang
        return result
    }

    static async getLangs() {
        const langs = await AppDataSource.createQueryBuilder()
            .select('DISTINCT language')
            .from(Summary, 'summary')
            .where("language != ''")
            .getRawMany()
        return langs.map(l => l.language)
    }


    static async setKey(key: string, language: string, value: any) {
        await Summary.insert({ key, language, value })
        return true
    }

    static async updateKey(key: string, value: string, language: string) {
        await Summary.update({ key, language }, { value })
        return true
    }

    static async getAbout(lang: string = 'en') {
        const titles = await Summary.findOne({ where: { key: 'titles', language: lang } })
        const about = await Summary.findOne({ where: { key: 'about', language: lang } })
        return {
            lang: lang,
            titles: titles?.value,
            about: about?.value
        }
    }

    static async updateAbout(lang: string, titles: string[], about: string) {
        const t1 = await Summary.findOne({ where: { language: lang, key: 'titles' } })
        if (t1) {
            await Summary.update({ language: lang, key: 'titles' }, { value: JSON.stringify(titles) })
        } else {
            await Summary.insert({ language: lang, key: 'titles', value: JSON.stringify(titles) })
        }
        const a1 = await Summary.findOne({ where: { language: lang, key: 'about' } })
        if (a1) {
            await Summary.update({ language: lang, key: 'about' }, { value: about })
        } else {
            await Summary.insert({ language: lang, key: 'about', value: about })
        }
        return true
    }
}
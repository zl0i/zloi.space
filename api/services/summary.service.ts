import { Summary } from '../entity/summary.entity'
import { AppDataSource } from '../src/db'

export class SummaryService {

    static async get(position: string, lang: string) {
        const links = await Summary.findOne({ where: { key: "links" } })
        const titles = await Summary.findOne({ where: { key: 'titles', language: lang } })
        const about = await Summary.findOne({ where: { key: 'about', language: lang } })
        const summary = await Summary.find({ where: { position: position, language: lang } }) ?? []
        const result: any = { summary: {} }
        for (const item of summary) {
            result.summary[item.key] = item.value
        }
        result.summary.lang = lang
        result.summary.position = position
        result.general = {
            lang: lang,
            titles: titles?.value,
            about: about?.value,
            links: links?.value
        }
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


    static async setKey(key: string, language: string, position: string, value: any) {
        await Summary.insert({ key, position, language, value })
        return true
    }

    static async updateKey(key: string, value: string, language: string, position: string) {
        await Summary.update({ key, position, language }, { value })
        return true
    }

    static async getAbout(lang: string) {
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
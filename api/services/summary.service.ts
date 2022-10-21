import { Summary } from '../entity/summary.entity'
import { AppDataSource } from '../src/db'
import objectStorage from "../src/storage"

const DEPLOY_TIER = process.env['DEPLOY_TIER'] ?? 'dev'
export class SummaryService {

    static async get(lang: string) {
        const summary = await Summary.find({ where: { language: lang } }) ?? []
        const result: any = {}
        for (const item of summary) {
            if (['education', 'courses', 'experience'].includes(item.key)) {
                item.value = this.sortPeriods(item.value)
            }
            result[item.key] = item.value
        }
        result.lang = lang
        return result
    }

    static async update(lang: string, summary: any) {
        const keys = Object.keys(summary)
        for (const key of keys) {
            await Summary.upsert({ language: lang, key: key, value: summary[key] }, { conflictPaths: ['key', 'language'] })
        }
        return true
    }

    static async getLangs() {
        const langs = await AppDataSource.createQueryBuilder()
            .select('DISTINCT language')
            .from(Summary, 'summary')
            .where("language != ''")
            .getRawMany()
        return langs.map(l => l.language)
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

    static async getPDF(lang: string = 'ru') {
        return await objectStorage.streamObject(`zloi-web-${DEPLOY_TIER}`, `zloi-${lang}.pdf`)
    }

    private static sortPeriods(value: any): unknown {
        const sorted = Array.from(value).sort((a: any, b: any) => {
            const start1 = new Date(a.range.from).getTime()
            const start2 = new Date(b.range.from).getTime()
            return start1 - start2
        })
        return sorted
    }
}
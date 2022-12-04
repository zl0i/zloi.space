import { SummaryState } from '~/store/summary'
import { BaseAPI } from "./base.api";

export class SummaryAPI extends BaseAPI {
    async pullAbout(lang: string) {
        const { data } = await this.context.$axios.get("/summary/about", {
            params: {
                language: lang,
            },
        });
        return data
    }

    async pushAbout(lang: string, titles: string[], about: string) {
        const { data } = await this.context.$axios.post(
            "/summary/about",
            {
                lang: lang,
                titles: titles,
                about: about,
            },            
        );
        return data
    }

    async pull(language: string) {
        const { data } = await this.context.$axios.get("/summary", {
            params: {
                language
            }
        });
        return data
    }

    async push(lang: string, summary: Partial<SummaryState>) {
        const { data } = await this.context.$axios.post(
            `/summary`,
            {
                lang,
                summary
            }
        );
        return data
    }
}
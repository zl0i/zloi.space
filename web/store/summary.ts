import type { ActionTree, MutationTree } from 'vuex'
import { RootState } from '.'

export const namespace = 'summary'

export interface IRange {
    from: string
    to: string
}

export interface IEducation {
    title: string
    speciality: string
    range: IRange
}

export interface IExperience {
    title: string
    range: IRange
    org: string
    link_org: string
    position: string
    duties: string
}

export interface ISocialLink {
    id: number
    name: string
    blob: string
    link: string
}

export interface SummaryState {
    lang: string
    titles: string[]
    about: string
    links: ISocialLink[]
    education: IEducation[]
    courses: IEducation[]
    experience: IExperience[]
    skills: string[]
    achievements: string[]
}

export const state = (): SummaryState => ({
    lang: "",
    titles: [""],
    about: "",
    links: [],
    education: [],
    courses: [],
    experience: [],
    skills: [],
    achievements: []
})

export const mutations: MutationTree<SummaryState> = {
    setSummary(state, data: any) {
        state.lang = data.lang
        state.titles = JSON.parse(data.titles ?? "[\"\"]")
        state.about = data.about
        state.links = data.links
        state.education = data.education
        state.courses = data.courses
        state.experience = data.experience
        state.skills = data.skills
        state.achievements = data.achievements
    }
}


export const actions: ActionTree<SummaryState, RootState> = {
    async requestSummary({ state, commit }, locale: string) {
        if (!this.$api) {
            return
        }
        const postfix = locale ?? this.$i18n.getLocaleCookie() ?? 'en'
        if (state.lang == postfix && state.about.length > 0) {
            return
        }
        try {
            const data = await this.$api.getSummary(postfix)
            commit("setSummary", data)
        } catch (e) {
            console.log(e)
        }
    }
}

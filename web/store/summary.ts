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

export interface ISkills {
    name: string
    value: number
    description: string
}

export interface ISocialLink {
    name: string
    image: string
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
    skills: ISkills[]
    tech_stack: string[]
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
    tech_stack: [],
    achievements: []
})

export const mutations: MutationTree<SummaryState> = {
    setSummary(state, data: any) {
        state.lang = data.lang
        state.titles = data.titles
        state.about = data.about
        state.links = data.links
        state.education = data.summary.education
        state.courses = data.summary.courses
        state.experience = data.summary.experience
        state.skills = data.summary.skills
        state.tech_stack = data.summary.tech_stack
        state.achievements = data.summary.achievements
    }
}


export const actions: ActionTree<SummaryState, RootState> = {
    async requestSummary({ state, commit }, locale: string) {
        if (!this.$axios) {
            return
        }
        const postfix = locale ?? this.$i18n.getLocaleCookie() ?? 'en'
        if (state.lang == postfix && state.about.length > 0) {
            return
        }
        try {
            console.log(this.$axios.defaults.baseURL)
            const res = await this.$axios.get(`/summary.${postfix}.json`)
            commit("setSummary", { lang: postfix, ...res.data })
        } catch (e) {
            console.log(e)
        }
    }
}

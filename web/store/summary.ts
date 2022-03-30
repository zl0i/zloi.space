import type { Context } from '@nuxt/types'
import type { GetterTree, ActionTree, MutationTree } from 'vuex'

const NUXT_HOST = process.env["NUXT_HOST"] ?? 'localhost'
const NUXT_PORT = process.env["NUXT_PORT"] ?? '3000'
const BASE_URL = `http://${NUXT_HOST}:${NUXT_PORT}`

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
    position: string
    duties: string
}

export interface ISkills {
    name: string
    value: number
    description: string
}

export interface ISocialLink {
    image: string
    link: string
}

export interface SummaryState {
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
    titles: [],
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


export const actions: ActionTree<SummaryState, SummaryState> = {
    async requestSummary({ commit }, context: string) {
        console.log(process.env["NUXT_HOST"], BASE_URL)
        const locale = context || this.$i18n.getLocaleCookie() || 'en'
        const res = await fetch(`${BASE_URL}/summary.${locale}.json`)
        commit("setSummary", await res.json())
    }
}
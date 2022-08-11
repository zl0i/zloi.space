import type { ActionTree, MutationTree } from 'vuex'

export const namespace = 'index'
export interface RootState {
    adminKey: string
    langs: string[]
}

export const state = (): RootState => ({
    adminKey: "",
    langs: []
})

export const MutationType = {
    SET_ADMIN_KEY: 'setAdminKey',
    SET_LANGS: "setLangs"
}

export const mutations: MutationTree<RootState> = {
    [MutationType.SET_ADMIN_KEY]: (state, adminKey: string) => { state.adminKey = adminKey },
    [MutationType.SET_LANGS]: (state, langs: string[]) => { state.langs = langs }
}

export const actions: ActionTree<RootState, RootState> = {
    setAdminKey({ commit }, key: string) {
        commit(MutationType.SET_ADMIN_KEY, key)
    },
    async requestLangs({ commit }) {
        const { data: langs } = await this.$axios.get('/summary/langs')
        commit(MutationType.SET_LANGS, langs)
    }
}

import type { Context } from '@nuxt/types'
import type { GetterTree, ActionTree, MutationTree } from 'vuex'

export interface RootState {
    adminKey: string
}

export const state = (): RootState => ({
    adminKey: ""
})

export const MutationType = {
    SET_ADMIN_KEY: 'setAdminKey'
}

export const mutations: MutationTree<RootState> = {
    [MutationType.SET_ADMIN_KEY]: (state, adminKey: string) => { state.adminKey = adminKey }
}

export const actions: ActionTree<RootState, RootState> = {
    setAdminKey({ commit }, key: string) {
        commit(MutationType.SET_ADMIN_KEY, key)
    }
}

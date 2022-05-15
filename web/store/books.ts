import type { Context } from '@nuxt/types'
import type { MutationTree, ActionTree } from 'vuex'

export const namespace = 'books'

//TODO: export from "types"
export interface IBook {
    id: string;
    name: string;
    html: string;
}

export interface BooksState {
    books: IBook[]
}

export const state = (): BooksState => ({
    books: []
})

export const MutationType = {
    OF: 'of',
}

export const mutations: MutationTree<BooksState> = {
    [MutationType.OF]: (state, data: IBook[]) => { state.books = data },
}

export const actions: ActionTree<BooksState, BooksState> = {
    async requestBooks({ commit, state }, _context: string) {
        if (state.books.length == 0) {
            const data = await this.$api.getReads()
            commit("of", data)
        }
    }
}

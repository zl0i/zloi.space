import type { MutationTree, ActionTree } from 'vuex'

export const namespace = 'books'

export interface IBook {
    id: string
    name: string
    icon: string
    description: string
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
        try {
            if (state.books.length == 0) {
                const data = await this.$api.getReads()
                commit("of", data)
            }
        } catch (error) {
            console.log(error)
        }

    }
}

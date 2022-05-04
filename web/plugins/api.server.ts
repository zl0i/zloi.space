import type { Plugin } from '@nuxt/types'
import { getInstructions, IInstruction, IBook, getBooks } from "~/src/db"


interface API {
    getReads: () => Promise<IBook[]>
    getKnoweldge: () => Promise<IInstruction[]>
}

declare module 'vue/types/vue' {
    interface Vue {
        $api: API
    }
}

declare module '@nuxt/types' {
    interface Context {
        $api: API
    }
    interface Context {
        $api: API
    }
}

declare module 'vuex/types/index' {
    interface Store<S> {
        $api: API
    }
}

const api: API = {
    async getReads() {
        return await getBooks()
    },
    async getKnoweldge() {
        return await getInstructions()
    }
}

const apiPlugin: Plugin = (_context, inject) => {
    inject('api', api)
}

export default apiPlugin
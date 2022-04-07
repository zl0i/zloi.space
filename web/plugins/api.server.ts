import type { Plugin } from '@nuxt/types'
import { instructions, IInstruction } from "../server-middleware/knowledgebase"
import { books, IBook } from "../server-middleware/reads"

interface API {
    truncate?: (text: string) => string
    getReads: () => Promise<IBook[]>
    getKnoweldge: () => Promise<IInstruction[]>
}

declare module 'vue/types/vue' {
    interface Vue {
        $api: API
    }
}
const api: API = {
    async getReads() {
        return books
    },
    async getKnoweldge() {
        return instructions
    }
}

const apiPlugin: Plugin = (_context, inject) => {
    inject('api', api)
}

export default apiPlugin
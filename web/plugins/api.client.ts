import type { Context, Plugin } from '@nuxt/types'
import type { IInstruction } from "../server-middleware/knowledgebase"
import type { IBook } from "../server-middleware/reads"

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

function test({ $axios }: Context) {
    const api: API = {
        async getReads() {
            const res = await $axios.get("/api/reads")
            return res.data
        },
        async getKnoweldge() {
            const res = await $axios.get("/api/knowledgebase")
            return res.data
        }
    }
    return api
}


const apiPlugin: Plugin = (context, inject) => {
    inject('api', test(context))
}

export default apiPlugin
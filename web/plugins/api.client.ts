import type { Context, Plugin } from '@nuxt/types'
import type { IInstruction, IBook } from "~/src/db"

declare interface API {
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

function fromContext({ $axios }: Context) {
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
    inject('api', fromContext(context))
}

export default apiPlugin
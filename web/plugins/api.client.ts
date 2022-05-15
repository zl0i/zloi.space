import type { Context, Plugin } from '@nuxt/types'


interface API {
    getReads: () => Promise<any>
    getKnoweldge: () => Promise<any>
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
            const { data } = await $axios.get("/api/books")
            return data
        },
        async getKnoweldge() {
            const res = await $axios.get("/api/intructions")
            return res.data
        }
    }
    return api
}


const apiPlugin: Plugin = (context, inject) => {
    inject('api', fromContext(context))
}

export default apiPlugin
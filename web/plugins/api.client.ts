import type { Context, Plugin } from '@nuxt/types'


interface API {
    getReads: () => Promise<any>
    getKnoweldge: () => Promise<any>
    getSummary: (position: string, language: string) => Promise<any>
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
            const { data } = await $axios.get("/books")
            return data
        },
        async getKnoweldge() {
            const res = await $axios.get("/intructions")
            return res.data
        },
        async getSummary(position: string, language: string) {
            const res = await $axios.get("/summary", {
                params: {
                    position, language
                }
            })
            return res.data
        }
    }
    return api
}


const apiPlugin: Plugin = (context, inject) => {
    inject('api', fromContext(context))
}

export default apiPlugin
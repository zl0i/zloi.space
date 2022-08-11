import type { Context, Plugin } from '@nuxt/types'


interface API {
    getReads: () => Promise<any>
    getKnoweldge: () => Promise<any>
    getSummary: (language: string) => Promise<any>
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
            const res = await $axios.get("/instructions")
            return res.data
        },
        async getSummary(language: string) {
            console.log("4")
            console.log($axios.defaults.baseURL)
            const res = await Promise.all([
                await $axios.get('/links'),
                await $axios.get("/summary", {
                    params: {
                        language
                    }
                })
            ])
            const { data } = await $axios.get('/links')
            console.log(data)
            console.log(await $axios.get('/links'),)
            const { data: links } = res[0]
            const { data: summary } = res[1]
            summary.general = { ...summary.general, links }
            return summary
        }
    }
    return api
}


const apiPlugin: Plugin = (context, inject) => {
    inject('api', fromContext(context))
}

export default apiPlugin
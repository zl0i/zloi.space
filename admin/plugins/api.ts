import type { Context, Plugin } from '@nuxt/types'
import { API, getAPI } from '~/api'



// interface API {
//     pullAbout: (lang: string) => Promise<any>
//     pushAbout: (lang: string, titles: string[], about: string) => Promise<any>
//     pullLinks: () => Promise<any>
//     pushLink: (name: string, link: string, blob: string) => Promise<any>
//     patchLink: (id: number, name: string, link: string, blob: string) => Promise<any>
//     deleteLink: (id: number) => Promise<any>
//     pullSummary: (lang: string) => Promise<any>
//     pushSummary: (lang: string, summary: Partial<SummaryState>) => Promise<any>
//     updateInstructions: () => Promise<any>
//     getBooks: () => Promise<any>
//     addBook: (link: string) => Promise<any>
//     updateBook: (id: number, status: string) => Promise<any>
//     deleteBook: (id: number) => Promise<any>
// }

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


const apiPlugin: Plugin = (context, inject) => {
    inject('api', getAPI(context.$axios, context.store.state["adminKey"]))
}

export default apiPlugin
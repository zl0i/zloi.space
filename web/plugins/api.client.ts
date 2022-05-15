import type { Context, Plugin } from '@nuxt/types'
import { Books } from '~/api/entity/books.entity'
import { Instructions } from '~/api/entity/instructions.entity'
import type { IInstruction} from "~/src/db"

interface API {
    getReads: () => Promise<Books[]>
    getKnoweldge: () => Promise<Instructions[]>
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
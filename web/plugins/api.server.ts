import type { Plugin } from '@nuxt/types'
import { BooksService } from '~/api/services/books.service'
import { InstructionsService } from '~/api/services/instruction.service'


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

const api: API = {
    async getReads() {
        return await BooksService.get()
    },
    async getKnoweldge() {
        return await InstructionsService.get()
    }
}

const apiPlugin: Plugin = (_context, inject) => {
    inject('api', api)
}

export default apiPlugin
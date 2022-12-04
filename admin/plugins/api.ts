import type { Context, Plugin } from '@nuxt/types'
import { API, getAPI } from '~/api'


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
    inject('api', getAPI(context))
}

export default apiPlugin
import type { Context, Middleware } from '@nuxt/types'


const middleware: Middleware = ({ store, redirect }: Context) => {
    if (!store.state.adminKey) {
        redirect('/?message=keyUndefined')
    }
}

export default middleware
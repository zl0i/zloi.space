import { createApp } from 'vue'
import App from "./App.vue"
import Knowledge from './components/Knowledge.vue'
import { i18n } from './i18n'
import * as Router from "vue-router"

const router = Router.createRouter({
    history: Router.createWebHistory(),
    routes: [
        { path: "/", component: App },
        { path: "/:hash", component: Knowledge }
    ],
    scrollBehavior(to, _from, _savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
            };
        }
        return { top: 0 }
    }
})

createApp(App)
    .use(i18n)
    .use(router)
    .mount('#app')

import type { Context, Plugin } from '@nuxt/types'
import { SummaryState } from '~/store/summary'


interface API {
    pullAbout: (lang: string) => Promise<any>
    pushAbout: (lang: string, titles: string[], about: string) => Promise<any>
    pullLinks: () => Promise<any>
    pushLink: (name: string, link: string, blob: string) => Promise<any>
    patchLink: (id: number, name: string, link: string, blob: string) => Promise<any>
    deleteLink: (id: number) => Promise<any>
    pullSummary: (lang: string) => Promise<any>
    pushSummary: (lang: string, summary: Partial<SummaryState>) => Promise<any>
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

function fromContext({ $axios, store }: Context) {
    const api: API = {
        async pullAbout(lang: string) {
            const { data } = await $axios.get("/summary/about", {
                params: {
                    language: lang,
                },
            });
            return data
        },
        async pushAbout(lang: string, titles: string[], about: string) {
            const { data } = await $axios.post(
                "/summary/about",
                {
                    lang: lang,
                    titles: titles,
                    about: about,
                },
                {
                    headers: {
                        Authorization: `Bearer ${store.state["adminKey"]}`,
                    },
                }
            );
            return data
        },
        async pullLinks() {
            const { data } = await $axios.get("/links");
            return data
        },
        async pushLink(name: string, link: string, blob: string) {
            const { data } = await $axios.post(
                `/links/`,
                {
                    name: name,
                    blob: blob,
                    link: link,
                },
                {
                    headers: {
                        Authorization: `Bearer ${store.state["adminKey"]}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return data
        },
        async patchLink(id: number, name: string, link: string, blob: string) {
            const { data } = await $axios.patch(
                `/links/${id}`,
                {
                    name: name,
                    blob: blob,
                    link: link,
                },
                {
                    headers: {
                        Authorization: `Bearer ${store.state["adminKey"]}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return data
        },
        async deleteLink(id: number) {
            await $axios.delete(`/links/${id}`, {
                headers: {
                    Authorization: `Bearer ${store.state["adminKey"]}`,
                },
            });
        },
        async pullSummary(language: string) {
            const { data } = await $axios.get("/summary", {
                params: {
                    language
                }
            });
            return data
        },
        async pushSummary(lang: string, summary: Partial<SummaryState>) {
            const { data } = await $axios.post(
                `/summary`,
                {
                    lang,
                    summary
                },
                {
                    headers: {
                        Authorization: `Bearer ${store.state["adminKey"]}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return data
        }
    }
    return api
}


const apiPlugin: Plugin = (context, inject) => {
    inject('api', fromContext(context))
}

export default apiPlugin
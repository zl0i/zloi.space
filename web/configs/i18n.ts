import { Options } from "@nuxtjs/i18n"
import en from "../lang/en"

const config: Options = {
    locales: [
        {
            code: 'ru',
            iso: 'ru-Ru',
            file: 'ru.ts'
        },
        {
            code: 'en',
            iso: 'en-US',
            file: 'en.ts'
        }
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "~/lang/",
    strategy: "no_prefix",
    detectBrowserLanguage: {
        useCookie: true,
        cookieKey: "locale",
    },
    vueI18n: {
        fallbackLocale: "ru",
        messages: {
            en
        }
    },
    onBeforeLanguageSwitch: (oldLocale, newLocale, _isInitialSetup, { store }) => {
        if (oldLocale) {
            store.dispatch("summary/requestSummary", newLocale)
        }
    }
}

export default config
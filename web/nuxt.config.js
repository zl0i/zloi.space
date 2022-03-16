export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Дмитрий Попов",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      { name: "keywords", content: "Дмитрий,Попов,zloi,программист" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      {
        rel: "stylesheet prefetch",
        href: "https://unpkg.com/@highlightjs/cdn-assets@11.3.1/styles/default.min.css",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/i18n",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "locale",
      // redirectOn: "root",
      // alwaysRedirect: true,
    },
    skipSettingLocaleOnNavigate: true,
    vueI18n: {
      fallbackLocale: "ru",
      messages: {
        en: {
          headers: {
            summary: "Summary",
            knoweledge: "Knoweledge",
            reads: "Reads",
          },
          summary: {
            title: "Summary",
            education: "Education",
            courses: "Сourses",
            experience: "Experience",
            skills: "Skills",
            tech_stack: "Tech stack",
            achievements: "Achievements",
          },
          books: {
            read: "Read",
            reading: "While reading",
          },
        },
        ru: {
          headers: {
            summary: "Резюме",
            knoweledge: "База знаний",
            reads: "Книги",
          },
          summary: {
            title: "Резюме",
            education: "Образование",
            courses: "Курсы",
            experience: "Опыт работы",
            skills: "Скиллы",
            tech_stack: "Технический стeк",
            achievements: "Достижения",
          },
          books: {
            read: "Прочитано",
            reading: "В процессе",
          },
        },
      },
    },
  },
  serverMiddleware: ["~/middleware/knowledgebase.ts"],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};

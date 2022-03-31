import firebaseConfig from "./configs/firebase";
import i18nConfig from "./configs/i18n";
import type { NuxtConfig } from '@nuxt/types'

const isDev = process.env['NODE_ENV'] != 'production'

const config: NuxtConfig = {
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
  router: {
    prefetchLinks: true,
  },
  components: true,
  build: {},
  buildModules: [
    '@nuxtjs/composition-api/module',
    '@nuxt/typescript-build'
  ],
  css: [],
  env: {},
  loading: { color: '#0c64c1' },
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/i18n",
    "@nuxtjs/firebase",
  ],
  i18n: i18nConfig,
  firebase: firebaseConfig,
  serverMiddleware: [
    {
      path: "/api/knowledgebase",
      handler: "./server-middleware/knowledgebase",
    },
    {
      path: "/api/reads",
      handler: "./server-middleware/reads",
    },
  ],
  axios: {
    baseURL: isDev ? "http://localhost:3000" : "https://0.0.0.0:3000",
    https: !isDev

  },
  server: {
    host: isDev ? "localhost" : "0.0.0.0",
    port: 3000
  },
  plugins: []
}

export default config

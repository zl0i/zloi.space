import firebaseConfig from "./configs/firebase";
import i18nConfig from "./configs/i18n";
import type { NuxtConfig } from '@nuxt/types'

const isDev = process.env['NODE_ENV'] != 'production'
const domain = process.env['DOMAIN'] ?? "localhost"

const config: NuxtConfig = {
  head: {
    title: "Дмитрий Попов",
    htmlAttrs: {
      lang: "en",
      prefix: "og: http://ogp.me/ns#"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Привет! Меня зовут Дмитрий, я backend программист, интересуюсь всем, что связано с железом и ПО начиная с STM32, администрированием серверов, разработкой backend-приложений и заканчивая дизайном." },
      { name: "format-detection", content: "telephone=no" },
      { name: "keywords", content: "Дмитрий,Попов,zloi,программист" },
      { name: "og:title", content: `${domain}` },
      { name: "og:type", content: "website" },
      { name: "og:site_name", content: `${domain}` },
      { name: "og:url", content: `https://${domain}` },
      { name: "og:image", content: `https://${domain}/img/og-image.jpg` },
      { name: "og:image:width", content: "968" },
      { name: "og:image:height", content: "504" },
      { name: "yandex-verification", content: "9425b9578d21b568" },
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
  build: {
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        preserveLineBreaks: false,
        collapseWhitespace: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyElements: true
      }
    }
  },
  buildModules: [
    '@nuxt/typescript-build',
    'nuxt-purgecss'
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
    baseURL: isDev ? "http://localhost:3000" : `https://${domain}`,
    https: isDev ? false : true
  },
  server: {
    host: isDev ? "localhost" : "0.0.0.0",
    port: 3000
  },
  plugins: [
    "./plugins/api.server.ts",
    "./plugins/api.client.ts",
  ],
  telemetry: {
    enabled: false
  }
}

export default config

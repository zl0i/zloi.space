import firebaseConfig from "./configs/firebase";
import i18nConfig from "./configs/i18n";
import type { NuxtConfig } from '@nuxt/types'

const isDev = process.env['NODE_ENV'] != 'production'
const API_URL = process.env['API_URL'] ?? "localhost"

const config: NuxtConfig = {
  modern: "server",
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
      { name: "og:title", content: `${API_URL}` },
      { name: "og:type", content: "website" },
      { name: "og:site_name", content: `${API_URL}` },
      { name: "og:url", content: `https://${API_URL}` },
      { name: "og:image", content: `https://${API_URL}/img/og-image.jpg` },
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
    prefetchLinks: false,
  },
  components: false,
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
    },
    optimization: {
      minimize: !isDev,
    },
  },
  buildModules: [
    '@nuxt/typescript-build',
    'nuxt-purgecss'
  ],
  transpile: ['vue-lazy-hydration'],
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
  axios: {
    baseURL: isDev ? "http://localhost:3000" : `https://${API_URL}`,
    https: isDev ? false : true,
  },
  server: {
    host: isDev ? 'localhost' :"0.0.0.0",
    port: isDev ? 8080 : 3000
  },
  plugins: [
    "./plugins/api.ts",
  ],
  telemetry: {
    enabled: false
  },
}

export default config

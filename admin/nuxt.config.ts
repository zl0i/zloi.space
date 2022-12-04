import type { NuxtConfig } from '@nuxt/types'
import auth from './configs/auth'

const isDev = process.env['NODE_ENV'] != 'production'
const API_URL = process.env['API_URL'] ?? "localhost"

const config: NuxtConfig = {
  head: {
    title: 'Admin',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [],
  plugins: [
    "./plugins/api.ts",
  ],
  components: false,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  axios: {
    baseURL: isDev ? "http://localhost:3000" : `https://${API_URL}`,
    https: isDev ? false : true,
  },
  auth: auth,
  server: {
    host: isDev ? 'localhost' : "0.0.0.0",
    port: isDev ? 8081 : 3000
  },
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
  telemetry: {
    enabled: false
  },
}

export default config

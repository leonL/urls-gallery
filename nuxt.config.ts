// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@nuxt/icon',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/mdc',
    '@vueuse/nuxt'
  ],
  css: ['~/assets/css/main.css'],
   ui: {
    colorMode: false
  },
  mdc: {
    headings: {
      anchorLinks: {
        h3: false, h4: false 
      }
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', name: 'French', file: 'fr.json' }
    ],
    bundle: {
      optimizeTranslationDirective: false
    }
  },
  runtimeConfig: {
    airtableApiKey: 'env',
    public: {
      apiBase: process.env.NUXT_NBWC_COVID_BASE_URL
    }
  }
})
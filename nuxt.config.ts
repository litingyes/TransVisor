// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@vite-pwa/nuxt',
  ],

  eslint: {
    config: {
      standalone: false,
    },
  },
  icon: {
    serverBundle: {
      collections: ['carbon', 'ic', 'ant-design', 'mdi', 'logos', 'vscode-icons', 'lucide'],
    },
  },

  css: ['~/assets/css/main.css'],
  imports: {
    dirs: [
      'utils/ast/*.ts',
    ],
    presets: [
      {
        from: 'destr',
        imports: ['destr'],
      },
    ],
  },
})

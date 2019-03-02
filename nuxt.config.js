module.exports = {
  /*
  ** Headers of the page
  */

  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#2b5797' },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'google-site-verification', content: 'WKSST5zHlhmOtPJuNAGSIhiPTkbQFXexcDAR5t_Oj2M' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=ng90LREre9' },
      // { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png?v=ng90LREre9' },
      // { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png?v=ng90LREre9' },
      // { rel: 'manifest', href: '/site.webmanifest?v=ng90LREre9' },
      // { rel: 'mask-icon', href: '/safari-pinned-tab.svg?v=ng90LREre9', color: '#5bbad5' },
      // { rel: 'shortcut icon', href: '/favicon.ico?v=ng90LREre9' },
    ]
  },
  plugins: [
    'plugins/api-client',
    'plugins/bootstrap',
    'plugins/i18n',
    'plugins/moment',
    { src: 'plugins/modal', ssr: false },
    { src: 'plugins/notifications', ssr: false },
    {
      src: 'plugins/clipboard',
      ssr: false
    },
    {
      src: 'plugins/countdown',
      ssr: false
    },
    { src: 'plugins/vuex-persist.js' }
  ],
  env: {
    serviceKey: 'CnM7oGgfqs7hzWVUAghdZr8CcgdEpbZY2SE2jVUoVgo',
    baseUrl: 'https://bittobe.com'
  },

  /*
  ** Customize the progress bar color
  */
  router: {
    middleware: ['i18n']
  },

  loading: '~/components/loading.vue',
  /*
  ** Build configuration
  */
  build: {
    // extractCSS: {
    //   allChunks: true
    // },
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

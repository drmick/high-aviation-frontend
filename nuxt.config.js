const environment = {
  API_URL: 'http://localhost:4000/api/v1/'
}
module.exports = {
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
    { src: 'plugins/vuex-persist.js' },
    'plugins/bootstrap',
    'plugins/i18n',
    'plugins/vee-validate',
    { src: '~/plugins/autocomplete', ssr: false }
    // 'plugins/moment',
    // { src: 'plugins/notifications', ssr: false },
    // {
    //   src: 'plugins/clipboard',
    //   ssr: false
    // }
  ],
  env: {
    baseUrl: 'https://highaviation.ru'
  },
  router: {
    middleware: ['i18n']
  },
  loading: '~/components/loading.vue',
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/users/sign_in', propertyName: 'token' },
          logout: { url: '/users/sign_out', method: 'delete' },
          user: { url: '/users/current' }
        }
      },
      tokenRequired: true,
      tokenType: 'Bearer'
    },
    // redirect: {
    //   login: '/sign_in',
    //   logout: '/',
    //   callback: '/sign_in',
    //   home: '/'
    // }
  },
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: environment.API_URL
    // credentials: true,
    // proxy: false,
    // debug: true,
    // retry: {
    //   retries: 3
    // },
    // requestInterceptor: (config, { store }) => {
    //   config.headers.common['Authorization'] = ''
    //   config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;application/json'
    //   return config
    // }
  },

  build: {
    // extractCSS: {
    //   allChunks: true
    // },
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
    extend (config, { isDev }) {
      if (isDev && process.client) {
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

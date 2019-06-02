const environment = {
  DEV_API: 'http://localhost:4000/api/v1/',
  PROD_API: 'https://highaviation.ru/api/v1/'
}
module.exports = {
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#000000' },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'google-site-verification', content: 'PDtlKn5wjasQsDQ_kzU9BPKrA-X44ncboZwWzqq66Gc' },
      { titleTemplate: 'High Aviation Club' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'apple-touch-icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'apple-touch-icon', type: 'image/png', sizes: '36x36', href: '/favicon-36x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#fbbc0b' }
    ]
  },
  plugins: [
    { src: 'plugins/vuex-persist.js' },
    'plugins/bootstrap',
    'plugins/i18n',
    'plugins/vee-validate',
    { src: '~/plugins/autocomplete', ssr: false },
    { src: 'plugins/notifications', ssr: false }
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
    '@nuxtjs/auth',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '53794195',
        webvisor: true
        // clickmap:true,
        // useCDN:false,
        // trackLinks:true,
        // accurateTrackBounce:true,
      }
    ]
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
    }
    // redirect: {
    //   login: '/sign_in',
    //   logout: '/',
    //   callback: '/sign_in',
    //   home: '/'
    // }
  },
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: process.NODE_ENV === 'development' ? environment.PROD_API : environment.PROD_API
    baseURL: environment.PROD_API
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
    extractCSS: {
      allChunks: true
    },
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
    // extend (config, { isDev }) {
    //   if (isDev && process.client) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}

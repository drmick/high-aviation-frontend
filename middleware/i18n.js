export default function ({ isHMR, app, store, route, params, error, req }) {
  if (isHMR) return

  let browserLocale = null

  try {
    browserLocale = req.headers['accept-language'].split(',')[0].toLocaleLowerCase().substring(0, 2)
  } catch (e) {
  }
  const locale = store.getters['app/getLocale'] || browserLocale || params.lang || app.i18n.fallbackLocale

  if (store.getters['app/getLocales'].indexOf(locale) === -1) {
    return error({ statusCode: 404 })
  }
  store.dispatch('app/setLocale', locale)
  app.i18n.locale = store.getters['app/getLocale']
}

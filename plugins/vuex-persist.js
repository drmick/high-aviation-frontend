import * as Cookies from 'js-cookie'
import cookie from 'cookie'
import createPersistedState from 'vuex-persistedstate'

export default ({ store, req, isDev }) => {
  createPersistedState({
    key: 'sitedata',
    reducer: state => ({
      app: state.app,
      flight: state.flight,
      auth: state.auth
    }),
    storage: {
      getItem: (key) => process.client ? Cookies.getJSON(key) : cookie.parse(req.headers.cookie || '')[key],
      setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: !isDev }),
      removeItem: (key) => Cookies.remove(key)
    }
  })(store)
}

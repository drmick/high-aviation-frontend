export default {
  namespaced: true,
  actions: {
    setLocale ({ commit }, value) {
      commit('SET_LOCALE', value)
    }
  },
  getters: {
    getLocale: state => state.locale,
    getLocales: state => state.locales,
    getAvailableFunds: state => state.funds
  },
  state: {
    funds: ['btc', 'btc_test'],
    locale: null,
    locales: ['ru']
  },
  mutations: {
    SET_LOCALE (state, value) {
      if (state.locales.indexOf(value) !== -1) {
        state.locale = value
      }
    }
  }
}

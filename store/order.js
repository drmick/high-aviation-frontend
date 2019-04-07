export default {
  namespaced: true,
  actions: {
    setOrder ({ commit }, value) {
      commit('SET_ORDER', value)
    },
    saveOrder ({ commit }, value) {
      commit('SAVE_ORDER', value)
    }
  },
  getters: {
    getOrder: state => state.order,
    getSaveOrder: state => state.saveOrder
  },
  state: {
    order: {},
    saveOrder: false
  },
  mutations: {
    SET_ORDER (state, value) {
      state.order = value
    },
    SAVE_ORDER (state, value) {
      state.saveOrder = value
    }
  }
}

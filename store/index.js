import app from './app'
import flight from './flight'
import order from './order'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    app,
    flight,
    order
  }
})

export default store

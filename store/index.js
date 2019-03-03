import app from './app'
import flight from './flight'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    app,
    flight
  }
})

export default store

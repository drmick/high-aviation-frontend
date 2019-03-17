import axios from 'axios'

export default {
  namespaced: true,
  actions: {
    setActiveFlight ({ commit }, value) {
      commit('SET_ACTIVE_FLIGHT', value)
    },

    fetchAirportData ({ commit }) {
      let uri = 'https://aviation-edge.com/v2/public/timetable?key=85177b-cf6156&iataCode=DME&type=departure'
      let flightData = {}
      axios.get(uri, {
        params: {
          appId: '5bf6ab55',
          appKey: 'af8dcc69453fdafb6eb13e5ad2933522'
        }
      })
        .then(function (response) {
          flightData = response.data
          commit('SET_AIRPORT_DATA', flightData)
        })
        .catch(function (error) {
          flightData = error
          commit('SET_AIRPORT_DATA', flightData)
        })
    }
  },
  getters: {
    getActiveFlight: state => state.activeFlight,
    getAirportData: state => state.airportData
  },
  state: {
    activeFlight: {},
    airportData: {}
  },
  mutations: {
    SET_ACTIVE_FLIGHT (state, value) {
      state.activeFlight = value
    },
    SET_AIRPORT_DATA (state, value) {
      state.lastAirportDataFetch = Date.now()
      state.airportData = value
    }
  }
}

import Vue from 'vue'
import VueMoment from 'vue-moment'

Vue.use(VueMoment)

export default ({ app }) => {
  app.moment = VueMoment
}

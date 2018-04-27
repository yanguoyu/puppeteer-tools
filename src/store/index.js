import Vue from 'vue'
import Vuex from 'vuex'
import comm from './modules/comm'
import home from './modules/home'
import work from './modules/work'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    comm,
    home,
    work
  },
  strict: debug
})

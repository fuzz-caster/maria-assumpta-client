import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true
  },
  mutations: {
    loading (state, v) {
      state.loading = v
    }
  },
  actions: {

  }
})

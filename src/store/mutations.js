import Vue from 'vue'

const mutations = {
  SET_APP_NAME (state, params) {
    state.appName = params.app
  },
  SET_APP_VERSION (state) {
    // Vue.set(state, 'appVersion', 'v.2.0')
  }
}

export default mutations
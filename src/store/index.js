import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import saveInLocal  from './plugins/saveInLocal'
import im from './modules/im'

Vue.use(Vuex)

export default new Vuex.Store({
  // 严格模式，必须使用 mutations 修改，不能直接复制修改
  strict: true,
  state,
  mutations,
  actions,
  getters,
  modules: {
    im
  },
  plugins: [saveInLocal ]
})
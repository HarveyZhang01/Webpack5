const state = {
  // 自定义模块的state
  userName: 'Hello im'
}
const getters = {
  // 自定义的 getters
  firstLetter: (state) => {
    return state.userName.substr(0, 1)
  }
}
const mutations = {
  // 自定义模块的 mutations
  SET_USER_NAME(state, params) {
    state.userName = params.userName
  }
}
const actions = {
  // 自定义模块的 actions
  // updateUserName ( {commit, state, rootState,. dispatch} ) {
  //   // rootState.appName
  //   // dispatch('xxx', '')
  // }
}

export default {
  // 命名空间
  // namespaced: true,
  state,
  getters,
  mutations,
  actions
}
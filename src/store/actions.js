import { getAppName } from '@/api/app'

const actions = {
  // updateAppName({ commit }) {
  //   getAppName()
  //   .then(res => {
  //     commit('SET_APP_NAME', res.data)
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }

  async updateAppName({ commit }) {
    try {
      const { data } = await getAppName()
      commit('SET_APP_NAME', data)
    } catch (err) {
      console.log(err);
    }
  }
}

export default actions
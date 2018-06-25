const state = {
  active: false,
  message: '',
  mode: '',
  timeout: 2000,
  x: null,
  y: 'bottom',
  color: 'info'
}
const getters = {
  getSnackbar (state) {
    return state
  }
}
const actions = {
  setSnackbar ({ commit }, payload) {
    commit('setSnackbar', payload)
  }
}
const mutations = {
  setSnackbar (state, payload) {
    for (let item in payload) {
      state[item] = payload[item]
    }
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}

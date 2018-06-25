const state = {
  active: false,
  url: ''
}
const getters = {
  shareDialogStatus (state) {
    return state.active
  },
  shareDialogUrl (state) {
    return state.url
  }
}
const actions = {
  shareDialogOpen ({ state, commit }, payload) {
    commit('shareDialogOpen', payload)
  },
  shareDialogClose ({ state, commit }) {
    commit('shareDialogClose')
  }
}
const mutations = {
  shareDialogOpen (state, payload) {
    state.url = payload
    state.active = true
  },
  shareDialogClose (state) {
    state.active = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

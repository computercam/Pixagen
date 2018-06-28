const state = {
  pool: [],
  reset: false
}

const getters = {
  getIfinite (state) {
    return state
  }
}

const actions = {
  updateInfinite ({ state, commit }, payload) {
    commit('updateInfinite', payload)
  }
}

const mutations = {
  updateInfinite (state, payload) {
    state.pool = state.pool.concat(payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

const state = {
  active: false,
  loading: false,
  message: '',
  icon: ''
}
const getters = {
  overlayStatus (state) {
    return state.active
  },
  overlayData (state) {
    return {
      loading: state.loading,
      message: state.message,
      icon: state.icon
    }
  }
}
const actions = {
  setOverlay ({ state, commit }, payload) {
    commit('setOverlay', payload)
  },
  setLoadingFailed ({ state, commit }) {
    commit('setOverlay', {
      message: 'LOADING FAILED, PLEASE TRY AGAIN',
      loading: false,
      icon: 'error_outline'
    })
    setTimeout(() => {
      commit('setOverlay', { active: false })
    }, 4000)
  }
}

const mutations = {
  setOverlay (state, payload) {
    for (let item in payload) {
      state[item] = payload[item]
    }
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}

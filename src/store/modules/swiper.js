const state = {
  active: false,
  index: 0,
  last: null,
  focus: true,
  options: {
    loop: false,
    mode: 'horizontal',
    lazy: true
  }
}
const getters = {
  getSwiper (state) {
    return state
  }
}
const actions = {
  swiperIndex ({ state, commit }, payload) {
    commit('swiperIndex', payload)
  },
  swiperToggleShow ({ state, commit }, payload) {
    if (state.active === false) {
      commit('swiperIndex', payload.index)
      commit('swiperActive', true)
    } else {
      if (typeof payload.last !== 'undefined') {
        commit('swiperLast', payload.last)
      }
      if (typeof payload.focus !== 'undefined') {
        commit('swiperExitFocus', payload.focus)
      }
      commit('swiperActive', false)
    }
  }
}
const mutations = {
  swiperLast (state, payload) {
    state.last = payload
  },
  swiperIndex (state, payload) {
    state.index = payload
  },
  swiperActive (state, payload) {
    state.active = payload
  },
  swiperExitFocus (state, payload) {
    state.focus = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

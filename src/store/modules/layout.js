const state = {
  columns: {
    big: {
      default: 4,
      1600: 3,
      1180: 2,
      762: 1
    },
    normal: {
      default: 5,
      1375: 4,
      1080: 3,
      762: 2,
      350: 1
    }
  },
  gutter: {
    default: 32,
    1000: 24,
    762: 16,
    350: 10
  },
  scroll: {
    y: 0,
    cH: 0,
    sH: 0,
    direction: 'down'
  },
  vpw: 0,
  navShow: true
}

const getters = {
  layoutColumns (state) {
    return state.columns
  },
  layoutGutters (state) {
    return state.gutter
  },
  margins (state, getters) {
    let gutter
    if (state.vpw >= 1180) {
      gutter = state.vpw / 14
    } else if (state.vpw >= 762) {
      gutter = state.vpw / 12
    } else {
      gutter = state.gutter['762']
    }
    return `0 ${gutter}px`
  },
  contentBuffer (state, getters) {
    let gutter
    if (state.vpw >= 1000) {
      gutter = state.vpw / 32
    } else if (state.vpw >= 762) {
      gutter = state.vpw / 30
    } else {
      gutter = state.gutter.default
    }
    return `${gutter}px`
  },
  getNavShow (state) {
    return state.navShow
  },
  getScroll (state) {
    return state.scroll
  },
  getVpw (state) {
    return state.vpw
  }
}

const actions = {
  onResize ({ state, commit }, payload) {
    commit('setVpw', payload)
  },
  onScroll ({ state, getters, commit, dispatch }, payload) {
    if (payload.y >= 0 && payload.y >= state.scroll.y) {
      commit('setScroll', { direction: 'down' })
      dispatch('setNavShow', false)
    } else {
      commit('setScroll', { direction: 'up' })
      dispatch('setNavShow', true)
    }
    commit('setScroll', payload)
  },
  setNavShow ({ state, commit }, payload) {
    commit('setNavShow', payload)
  }
}

const mutations = {
  setVpw (state, payload) {
    state.vpw = payload
  },
  setScroll (state, payload) {
    for (let item in payload) {
      state.scroll[item] = payload[item]
    }
  },
  setNavShow (state, payload) {
    state.navShow = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

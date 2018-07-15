const state = {
  data: [],
  increment: 10,
  range: {
    start: 0,
    end: 20
  }
}

const getters = {
  tilesData (state) {
    return state.data
  },
}

const actions = {
  tilesReset ({ state, commit, }, payload) {
    commit('tilesReset')
    commit('tilesInsert', { 
      append: false, 
      insert: payload.pictures.slice(state.range.start, state.range.end)
    })
  },
  tilesAppend ({ state, commit }, payload) {
    if (state.range.end < payload.pictures.length) {
      commit('tilesIncrement')
      commit('tilesInsert', { 
        append: true, 
        insert: payload.pictures.slice(state.range.start, state.range.end) 
      })
    }
  }
}

const mutations = {
  tilesReset (state) {
    state.range.start = 0
    state.range.end = state.increment
  },
  tilesIncrement (state) {
    state.range.start = state.range.end
    state.range.end += state.increment
  },
  tilesInsert (state, payload) {
    if (payload.append === true ) {
      state.data = state.data.concat(payload.insert)
    } else {
      state.data = payload.insert
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
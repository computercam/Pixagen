const state = {
  data: [],
  increment: 15,
  reset: 10,
  range: {
    start: 0,
    end: 10
  }
}

const getters = {
  tilesData (state) {
    return state.data
  },
}

const actions = {
  tilesReset ({ state, commit, }, payload) {
    commit('tilesReset', { overide: payload.overide })
    commit('tilesInsert', { 
      append: false, 
      insert: payload.pictures.slice(state.range.start, state.range.end)
    })
  },
  tilesAppend ({ state, commit }, payload) {
    if (state.range.end < payload.pictures.length) {
      commit('tilesIncrement', { overide: payload.overide })
      commit('tilesInsert', {
        swiper: payload.swiper,
        append: true, 
        insert: payload.pictures.slice(state.range.start, state.range.end) 
      })
    }
  }
}

const mutations = {
  tilesReset (state, payload) {
    state.range.start = 0
    if (typeof payload.overide === 'number') {
      console.log('override')
      state.range.end = payload.overide
    } else {
      state.range.end = state.reset
    }
  },
  tilesIncrement (state, payload) {
    state.range.start = state.range.end
    if (typeof payload.overide === 'number') {
      state.range.end += payload.overide
    } else {
      state.range.end += state.increment
    }
  },
  tilesInsert (state, payload) {
    if (payload.append === true ) {
      if (payload.swiper === true) {
        state.data.push(...payload.insert)
      } else {
        state.data = state.data.concat(payload.insert)
      }
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
const state = {
  data: [],
  increment: 15,
  reset: 15,
  amount: 0,
}

const getters = {
  tilesData (state) {
    return state.data
  },
  tilesIncrementor (state) {
    return state.increment
  }
}

const actions = {
  tilesReset ({state, commit}, payload) {
    commit('tilesAmount', { 
      overide: payload.overide, 
      max: payload.pictures.length,
      reset: true
    })
    commit('tilesInsert', {
      insert: payload.pictures
    })
  },
  tilesAppend ({ state, commit }, payload) {
    if (state.amount < payload.pictures.length) {
      commit('tilesAmount', { 
        overide: payload.overide, 
        max: payload.pictures.length,
        reset: false
      })
      commit('tilesInsert', {
        insert: payload.pictures
      })
    }
  }
}

const mutations = {
  tilesAmount (state, payload) {
    if (payload.reset === true) {
      if (typeof payload.overide === 'number') {
        state.amount = payload.overide
      } else {
        state.amount = state.increment
      }
    } else {
      if (typeof payload.overide === 'number') {
        state.amount += payload.overide
      } else {
        state.amount += state.increment
      }
    }
    if (state.amount > payload.max) {
      state.amount = payload.max
    }
  },
  tilesInsert (state, payload) {
    let temp = new Array(state.amount)
    let i = 0
    while (i < state.amount) {
      temp[i] = payload.insert[i]
      i++
    }
    state.data = temp
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
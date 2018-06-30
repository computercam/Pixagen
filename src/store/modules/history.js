import router from '../../router/index'

let storage = window.localStorage.history

const template = {
  max: 40,
  total: 0,
  index: 0,
  data: [],
  lastGenerate: null
}

let state

if (typeof storage === 'undefined') {
  state = template
} else {
  state = JSON.parse(storage)
}

const getters = {
  historyExists (state) {
    return state.total > 0
  },
  historyCurrent (state) {
    return state.data[state.index]
  },
  historyAll (state) {
    return state.data
  },
  historyValidateExists: state => options => {
    let exists = false
    if (state.data.length > 0) {
      let i = 0
      for (let item of state.data) {
        let string = item.keywords.sort().toString()
        let criteria = options.words.sort().toString()
        if (string === criteria) {
          if (options.sbi === false && options.rimg === false) {
            exists = i
            break
          } else {
            if (options.rimg !== false) {
              if (item.rimg === options.rimg) {
                exists = i
                break
              }
            }
            if (options.sbi !== false) {
              if (item.sbi === options.sbi) {
                exists = i
                break
              }
            }
          }
        }
        i++
      }
    }
    return exists
  },
  historyLastGenerate (state) {
    return state.lastGenerate
  }
}
const actions = {
  historyAdd ({ state, commit }, payload) {
    commit('historyAdd', payload)
    if (state.total < state.max) {
      commit('historyIncrement')
    } else {
      commit('historyClean')
    }
    commit('historySave')
  },
  historyTimetravel ({ state, commit }, payload) {
    commit('historyAdd', state.data[payload])
    commit('historyDelete', payload)
    router.push({
      name: 'b0'
    })
  },
  historyLastGenerate ({ state, commit }, payload) {
    commit('historyLastGenerate', payload)
  }
}
const mutations = {
  historyDelete (state, payload) {
    state.data.splice(payload, 1)
  },
  historyClean (state) {
    state.data.pop()
  },
  historyIncrement (state) {
    state.total++
  },
  historyAdd (state, payload) {
    state.data.unshift(payload)
  },
  historyLastGenerate (state, payload) {
    state.lastGenerate = payload
  },
  historySave (state) {
    window.localStorage.setItem('history', JSON.stringify(state))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

import moment from 'moment'
import router from '../../router/index'

const storage = window.localStorage.history

const template = {
  max: 50,
  total: 0,
  index: 0,
  data: [],
  lastGenerate: 0
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
        let string = item.keywords.slice()
        string = string.sort().toString()
        let criteria = options.words.slice()
        criteria = criteria.sort().toString()
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
  historyAdd ({ state, commit, dispatch }, payload) {
    commit('historyAdd', payload)
    if (state.total < state.max) {
      commit('historyIncrement')
    } else {
      commit('historyClean')
    }
    commit('historySave')
  },
  historyTimetravel ({ state, commit }, payload) {
    let temp = state.data[payload]
    console.log(temp)
    commit('historyDelete', payload)
    commit('historyAdd', temp)
    router.push({
      name: 'b0'
    })
    commit('historySave')
  },
  historyLastGenerate ({ state, commit }, payload) {
    commit('historyLastGenerate', payload)
    commit('historySave')
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
    payload.time = moment()
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

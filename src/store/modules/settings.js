
const storage = window.localStorage.settings

const template = {
  nav: {
    title: 'Settings',
    back: 'b1'
  },
  categories: {
    active: null,
    excluded: [],
    unique: true,
    last: null
  },
  keywords: {
    amount: 2,
    max: 4,
    safeMode: true,
    blacklist: [],
    single: false,
    random: true,
    last: null
    // translate: {
    //   active: false,
    //   languages: [
    //    . . . add languages
    //   ],
    //   language: 0
    // }
  }
}

let state

if (typeof storage === 'undefined') {
  state = template
} else {
  state = JSON.parse(storage)
}

const getters = {
  getSettings (state) {
    return state
  },
  getBlacklistQuery (state) {
    let blacklist = ''
    state.keywords.blacklist.forEach((phrase, i, arr) => {
      blacklist += '+-"'
      blacklist += phrase.replace(/[\s-]+/gm, '+')
      blacklist += '"'
    })
    return blacklist
  }
}

const actions = {
  toggleUnique ({ state, commit }) {
    if (state.categories.unique === false) {
      if (state.keywords.amount > state.categories.active.length) {
        commit('setKeywordAmount', state.categories.active.length)
      }
    }
    commit('toggleUnique')
    commit('settingsSave')
  },
  toggleSafemode ({ state, commit }) {
    commit('toggleSafemode')
    commit('settingsSave')
  },
  toggleSingle ({ state, commit }) {
    commit('toggleSingle')
    commit('settingsSave')
  },
  toggleTranslation ({ state, commit }) {
    commit('toggleTranslation')
    commit('settingsSave')
  },
  setTranslationLanguage ({ state, commit }, payload) {
    commit('setTranslationLanguage', payload)
    commit('settingsSave')
  },
  setActiveCategories ({ state, commit }, payload) {
    commit('setActiveCategories', payload)
    commit('diffActiveExcluded')
    commit('settingsSave')
  },
  addActiveCategory ({ state, commit }, payload) {
    let index = state.categories.excluded.findIndex(key => {
      return key === payload.trim()
    })
    commit('removeExcludedCategory', index)
    commit('addActiveCategory', payload)
    commit('settingsSave')
  },
  removeActiveCategory ({ state, commit, dispatch }, payload) {
    if (
      (state.categories.unique === false &&
        state.categories.active.length > 1) ||
        state.categories.active.length > state.keywords.amount
    ) {
      let index = state.categories.active.findIndex(key => {
        return key === payload.trim()
      })
      commit('removeActiveCategory', index)
      commit('addExcludedCategory', payload)
      commit('settingsSave')
    } else {
      dispatch('setSnackbar', {
        active: true,
        message: 'You cannot remove anymore categories',
        color: 'error',
        mode: 'multi',
        timeout: 5000
      })
    }
  },
  setKeywordAmount ({ state, commit, dispatch }, payload) {
    if (state.categories.unique && payload > state.categories.active.length) {
      dispatch('setSnackbar', {
        active: true,
        message: 'Try disabling unique categories or adding more active categories.',
        color: 'error',
        mode: 'multi',
        timeout: 6000
      })
    } else {
      commit('setKeywordAmount', payload)
      commit('settingsSave')
    }
  },
  setBlacklist ({ state, commit }, payload) {
    payload = payload.replace(/^,+/, '')
      .replace(/,+$/, '')
      .replace(/(,\s,\s*)+/gm, ', ')
      .replace(/,{2,}/gm, ', ')
      .replace(/\s{2,}/gm, ' ')
      .replace(/\s+,/gm, ', ')
      .replace(/,\s+/gm, ', ')
      .replace(/,\s{0}(\w)/gm, ', $1')
      .replace(/[^a-zA-Z1-9,\s]+/gm, '')
      .split(',')
    commit('setBlacklist', payload)
    commit('settingsSave')
  },
  setSettingsNav ({ state, commit }, payload) {
    commit('setSettingsNav', payload)
  }
}

const mutations = {
  toggleUnique (state) {
    state.categories.unique = !state.categories.unique
  },
  toggleSafemode (state) {
    state.keywords.safeMode = !state.keywords.safeMode
  },
  toggleSingle (state) {
    state.keywords.single = !state.keywords.single
  },
  toggleTranslation (state) {
    state.keywords.translate.active = !state.keywords.translate.active
  },
  setTranslationLanguage (state, payload) {
    state.keywords.translate.language = payload
  },
  setActiveCategories (state, payload) {
    state.categories.active = payload
  },
  addActiveCategory (state, payload) {
    state.categories.active.push(payload)
  },
  addExcludedCategory (state, payload) {
    state.categories.excluded.push(payload)
  },
  removeActiveCategory (state, payload) {
    state.categories.active.splice(payload, 1)
  },
  removeExcludedCategory (state, payload) {
    state.categories.excluded.splice(payload, 1)
  },
  setKeywordAmount (state, payload) {
    state.keywords.amount = payload
  },
  setBlacklist (state, payload) {
    state.keywords.blacklist = payload
  },
  setSettingsNav (state, payload) {
    state.nav.title = payload.title
    state.nav.back = payload.back
  },
  diffActiveExcluded () {
    state.categories.active = state.categories.active.filter((val) => !state.categories.excluded.includes(val))
  },
  settingsSave (state) {
    window.localStorage.setItem('settings', JSON.stringify(state))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

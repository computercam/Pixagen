const state = {
  navbar: {
    items: {
      // home: {
      //   label: 'Home',
      //   icon: 'home',
      //   route: 'h0'
      // },
      browser: {
        label: 'Browser',
        icon: 'remove_red_eye',
        route: 'b0'
      },
      settings: {
        label: 'Settings',
        icon: 'settings',
        route: 's0'
      },
      walkthrough: {
        label: 'Help',
        icon: 'help',
        route: 'w0'
      },
      about: {
        label: 'About',
        icon: 'child_care',
        route: 'a0'
      }
    }
  },
  actionBar: {
    selected: 'browse',
    items: {
      results: {
        label: 'browse',
        icon: 'remove_red_eye',
        route: 'b0'
      },
      generate: {
        label: 'generate',
        icon: 'cached',
        route: 'b1'
      },
      liked: {
        label: 'liked',
        icon: 'favorite',
        route: 'b2'
      },
      history: {
        label: 'history',
        icon: 'history',
        route: 'b3'
      }
    }
  }
}

const getters = {
  actionbarState (state) {
    return state.actionBar
  },
  navbarState (state) {
    return state.navbar
  }
}
const actions = {
  setActionbarSelected ({ state, commit }, payload) {
    commit('setActionbarSelected', payload)
  }
}
const mutations = {
  setActionbarSelected (state, payload) {
    state.actionBar.selected = payload
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}

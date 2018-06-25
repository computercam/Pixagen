import Vue from 'vue'
import Vuex from 'vuex'
import history from './modules/history'
import navigation from './modules/navigation'
import liked from './modules/liked'
import settings from './modules/settings'
import generate from './modules/generate'
import overlay from './modules/overlay'
import snackbar from './modules/snackbar'
import share from './modules/share'

Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    history,
    navigation,
    liked,
    settings,
    generate,
    overlay,
    snackbar,
    share
  },
  state: {
    picboardShow: false, // Used to prevent lag when loading picboard
    navShow: true
  },
  getters: {
    getPicboardShow (state) {
      return state.picboardShow
    },
    getNavShow (state) {
      return state.navShow
    }
  },
  actions: {
    setPicboardShow ({ state, commit }, payload) {
      commit('setPicboardShow', payload)
    },
    setNavShow ({ state, commit }, payload) {
      commit('setNavShow', payload)
    }
  },
  mutations: {
    setPicboardShow (state, payload) {
      state.picboardShow = payload
    },
    setNavShow (state, payload) {
      state.navShow = payload
    }
  }
})

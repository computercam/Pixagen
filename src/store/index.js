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
import layout from './modules/layout'
import infinite from './modules/infinite'

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
    share,
    layout,
    infinite
  }
})

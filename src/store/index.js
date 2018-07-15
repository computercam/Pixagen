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
import help from './modules/help'
import swiper from './modules/swiper'
import tiles from './modules/tiles'

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
    help,
    swiper,
    tiles
  },
  getters: {
    copyright () {
      let d = new Date()
      return `Copyright ${d.getFullYear()}, LimitUnknown.com`
    },
    version () {
      return '0.4.4 Beta'
    }
  }

})

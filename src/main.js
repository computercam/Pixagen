// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
Vue.config.devtools = true
Vue.config.performance = true
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { store } from './store/index.js'
import 'vuetify/dist/vuetify.min.css'
import 'animate.css/animate.min.css'
import colors from 'vuetify/es5/util/colors'
import VueMasonry from 'vue-masonry-css'

Vue.use(Vuetify, { theme: {
  primary: '#7b7292',
  secondary: colors.deepPurple.accent1,
  accent: colors.cyan.lighten3,
  error: colors.pink.lighten1,
  warning: colors.yellow.lighten1,
  info: colors.cyan.darken2,
  success: colors.green.lighten1
}})

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(VueMasonry)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import 'animate.css/animate.min.css'
import VueCordova from 'vue-cordova'
import VueHead from 'vue-head'
import App from './App'
import router from './router'
import { store } from './store/index.js'
import VueMasonry from 'vue-masonry-css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: '#7b7292',
    secondary: colors.deepPurple.accent1,
    accent: colors.cyan.lighten3,
    error: colors.pink.lighten1,
    warning: colors.yellow.lighten1,
    info: colors.cyan.darken2,
    success: colors.green.lighten1
  }
})

Vue.use(VueCordova)
Vue.use(VueHead)
Vue.use(VueMasonry)

Vue.config.productionTip = false

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  head: {
    meta: [
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      }
    ]
  }
})

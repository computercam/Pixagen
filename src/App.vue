<template>
  <v-app>
    <v-content>
      <app-overlay></app-overlay>
      <app-snackbar></app-snackbar>
      <app-share></app-share>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue'
import InfoOverlay from './components/InfoOverlay'
import InfoSnackbar from './components/InfoSnackbar'
import ShareDialog from './components/ShareDialog'

export default {
  data () {
    return {
      cordova: Vue.cordova
    }
  },
  components: {
    'app-overlay': InfoOverlay,
    'app-snackbar': InfoSnackbar,
    'app-share': ShareDialog
  },
  watch: {
    $route (to, from) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  },
  created () {
    let self = this
    this.cordova.on('deviceready', () => {
      self.onDeviceReady()
    })
  },
  beforeMount () {
    this.$store.dispatch('initializeWordlistsData')
  },
  methods: {
    onDeviceReady: function () {
      // Handle the device ready event.
      this.cordova.on('pause', this.onPause, false)
      this.cordova.on('resume', this.onResume, false)
      if (this.cordova.device.platform === 'Android') {
        document.addEventListener('backbutton', this.onBackKeyDown, false)
      }
    },
    onPause () {
      // Handle the pause lifecycle event.
      console.log('pause')
    },
    onResume () {
      // Handle the resume lifecycle event.
      // SetTimeout required for iOS.
      setTimeout(function () {
        console.log('resume')
      }, 0)
    },
    onBackKeyDown () {
      // Handle the back-button event on Android. By default it will exit the app.
      navigator.app.exitApp()
    }
  }
}
</script>

<style>
 .menu__content {
   border-radius: 10px !important;
 }

 .dark-text {
   color: #6c6974 !important;
 }

 .darker-text {
   color: #46444b;
 }

 .light-text {
   color: #9692a2 !important;
 }

 .color-text {
   color: #7b7292 !important;
 }

.toolbar,
.bottom-nav {
  z-index: 100;
}
.fav-active {
  color: #26c6da !important;
}
body {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
.footer {
  /* Apply this to v-bottom-nav if necessary. */
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}
</style>

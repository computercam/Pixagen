<template>
  <v-app>
    <v-content>
      <app-overlay></app-overlay>
      <app-snackbar></app-snackbar>
      <app-share></app-share>
      <router-view :class="{ obscured: overlayStatus }"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import InfoOverlay from './components/organisms/InfoOverlay'
import InfoSnackbar from './components/organisms/InfoSnackbar'
import ShareDialog from './components/organisms/ShareDialog'

export default {
  components: {
    'app-overlay': InfoOverlay,
    'app-snackbar': InfoSnackbar,
    'app-share': ShareDialog
  },
  watch: {
    overlayStatus () {
      if (this.overlayStatus) {
        document.documentElement.style.overflow = 'hidden'
      } else {
        document.documentElement.style.overflow = 'initial'
      }
    },
    $route (to, from) {
      window.scroll({ top: 0, behavior: 'instant' })
    }
  },
  computed: {
    overlayStatus () {
      return this.$store.getters.overlayStatus
    }
  },
  beforeMount () {
    this.$store.dispatch('initializeWordlistsData')
  }
}
</script>

<style>
  ::selection {
    background: rgba(123, 117, 148, 0.4) !important;
  }
  body {
    overflow-anchor: none !important;
  }
 .menu__content, .v-menu__content {
   border-radius: 10px !important;
 }
 .v-input--selection-controls__input {
   margin-right: 0px;
 }
 .obscured {
    filter: blur(2.25px) grayscale(40%) contrast(70%) brightness(105%);
    position: absolute;
    width: 100vw;
    height: 100vh;
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

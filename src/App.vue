<template>
  <v-app class="app-root">
    <app-navbar class="navBar"></app-navbar>
    <v-content>
      <app-overlay></app-overlay>
      <app-snackbar></app-snackbar>
      <app-share></app-share>
      <router-view :class="{ obscured: overlayStatus }"></router-view>
    </v-content>
    <app-actionbar class="actionBar"></app-actionbar>
  </v-app>
</template>

<script>
  import InfoOverlay from './components/organisms/InfoOverlay'
  import InfoSnackbar from './components/organisms/InfoSnackbar'
  import ShareDialog from './components/organisms/ShareDialog'
  import Navbar from './components/organisms/Navbar'
  import Actionbar from './components/organisms/Actionbar'

  export default {
    components: {
      'app-overlay': InfoOverlay,
      'app-snackbar': InfoSnackbar,
      'app-share': ShareDialog,
      'app-navbar': Navbar,
      'app-actionbar': Actionbar
    },
    data () {
      return {
        spaceTop: 56,
        spaceBottom: 56
      }
    },
    methods: {
      toggleCanScroll() {
        let resultsContainer = document.querySelector('.results-container')
        if (this.swiperStatus) {
          if (resultsContainer !== null) {
            resultsContainer.style.display = 'none'
          }
          resultsContainer.style.position = 'fixed'
        } else {
          if (resultsContainer !== null) {
            resultsContainer.style.display = 'initial'
          }
          resultsContainer.style.position = 'initial'
        }
        if (this.overlayStatus || this.swiperStatus) {
          resultsContainer.style.overflow = 'hidden'
        } else {
          resultsContainer.style.overflow = 'initial'
        }
      }
    },
    watch: {
      overlayStatus() {
        this.toggleCanScroll()
      },
      swiperStatus() {
        this.toggleCanScroll()
      },
      $route(to, from) {
        window.scroll({ top: 0, behavior: 'instant' })
      },
      navShow () {
        let top = document.querySelector('.navBar nav')
        let bottom = document.querySelector('.actionBar')
        if (this.navShow === false) {
          top.style.transform = 'translateY(' + this.spaceTop * -1 + 'px)'
          bottom.style.transform = 'translateY(' + this.spaceBottom + 'px)'
        } else {
          top.style.transform = 'translateY(' + 0 + 'px)'
          bottom.style.transform = 'translateY(' + 0 + 'px)'
        }
      }
    },
    computed: {
      overlayStatus() {
        return this.$store.getters.overlayStatus
      },
      swiperStatus() {
        return this.$store.getters.getSwiper.active
      },
      navShow () {
        return this.$store.getters.getNavShow
      },
      navbarsComputedHeight () {
        return { 
          top: document.querySelector('.navBar .v-toolbar').clientHeight,
          bottom: document.querySelector('.actionBar .v-bottom-nav').clientHeight
        }
      }
    },
    beforeMount() {
      this.$store.dispatch('initializeWordlistsData')
    },
    mounted () {
      setTimeout(() => {
        this.spaceTop = this.navbarsComputedHeight.top
        this.spaceBottom = this.navbarsComputedHeight.bottom
      }, 500)
    },
  }
</script>

<style>
  /*
    Fix for chrome hitbox desync in fixed position elements
    https://stackoverflow.com/questions/51086508/clickable-area-of-a-fixed-div-is-displaced-relative-to-url-bar-scroll-in-mobile
    https://stackoverflow.com/questions/25298443/force-address-bar-to-show-in-mobile-chrome-app
    https://stackoverflow.com/questions/18061308/prevent-address-bar-hiding-in-mobile-browsers
  */

  html {
    overflow-anchor: none !important;
    background-color: white;
    overflow: hidden;
  }

  body {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .app-root {
    background: #fafafa;
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .v-content {
    padding-bottom: 20vh !important;
    height: 100vh !important;
    overflow-y: auto;
  }
  .navBar nav,
  .actionBar {
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  .navBar {
    position: absolute;
    top: 0;
    width: 100vw;
  }
  .actionBar {
    position: absolute;
    bottom: 0;
    width: 100vw;
  }

  /* END Fix for chrome hitbox desync in fixed position elements */

  ::selection {
    background: rgba(123, 117, 148, 0.4) !important;
  }

  .fadeIn {
    -webkit-animation: fadeIn 650ms;
    -moz-animation: fadeIn 650ms;
    -o-animation: fadeIn 650ms;
    animation: fadeIn 650ms;
  }

  .fadeOut {
    -webkit-animation: fadeOut 450ms;
    -moz-animation: fadeOut 450ms;
    -o-animation: fadeOut 450ms;
    animation: fadeOut 450ms;
  }

  .menu__content,
  .v-menu__content {
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
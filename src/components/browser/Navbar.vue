<template>
  <div>
    <v-toolbar fixed flat>
      <!-- <v-toolbar-title class="subheading">{{ state.logo }}</v-toolbar-title> -->
      <v-toolbar-title class="logo-text"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu left offset-x bottom offset-y :nudge-width="110">
        <v-btn id="menu-activator" icon slot="activator">
          <v-icon color="primary">{{ state.navicon }}</v-icon>
        </v-btn>
        <v-card class="round-edge">
          <v-list>
            <v-list-tile v-for="item in state.items" :key="item.label">
              <v-list-tile-title @click="nav(item.route)" class="body-1 dark-text">
                <v-icon color="primary" class="navicon">{{ item.icon }}</v-icon>
                {{ item.label.toUpperCase() }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
import { routerHelpers } from '../../router/routerHelpers'

export default {
  mixins: [routerHelpers],
  methods: {
    hideMenu () {
      let menu = document.querySelectorAll('.menuable__content__active')
      let activator = document.querySelector('#menu-activator')
      if (menu.length > 0) {
        activator.click()
      }
    }
  },
  computed: {
    state () {
      return this.$store.getters.navbarState
    }
  },
  mounted () {
    window.addEventListener('scroll', this.hideMenu)
  },
  destroyed () {
    window.removeEventListener('scroll', this.hideMenu)
  }
}
</script>

<style scoped>
 .round-edge {
   border-radius: 10px !important;
 }
.logo-text {
  background-image: url('../../assets/logo/icon.svg');
  background-size: contain;
  background-position: left;
  width: 100%;
  padding:18px;
}
.navicon {
  margin-right: 12px;
}
</style>

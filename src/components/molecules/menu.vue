<template>
  <v-menu left offset-x bottom offset-y :nudge-width="120">
    <v-btn id="menu-activator" icon slot="activator">
      <v-icon color="primary">menu</v-icon>
    </v-btn>
    <v-card class="round-edge">
      <v-list>
        <v-list-tile v-for="item in state.items" :key="item.label">
          <v-list-tile-title @click="nav(item.route)" class="body-1 dark-text">
            <v-icon color="primary" small class="navicon">{{ item.icon }}</v-icon>
            <span class="menu-text">
              {{ item.label.toUpperCase() }}
            </span>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-menu>
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
  .body-1 {
    cursor: pointer;
  }
  .round-edge {
    border-radius: 10px !important;
  }
  .navicon {
    margin-right: 12px;
  }
</style>

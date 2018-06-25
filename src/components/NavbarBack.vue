<template>
  <div>
    <v-toolbar dense fixed color="primary">
      <v-icon dark v-if="defaultRoute" @click="nav(state.items.browser.route)">
        {{ state.backicon }}
      </v-icon>
      <v-icon dark v-else @click="nav(route)">
        {{ state.backicon }}
      </v-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="subheading">
        {{ title.toUpperCase() }}
      </v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
import { routerHelpers } from '../router/routerHelpers'

export default {
  mixins: [routerHelpers],
  props: ['title', 'route'],
  computed: {
    state () {
      return this.$store.getters.navbarState
    },
    defaultRoute () {
      return typeof this.route === 'undefined'
    }
  }
}
</script>

<style scoped>
  .subheading {
    color: white !important;
  }
</style>

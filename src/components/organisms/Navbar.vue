<template>
  <div>
    <v-toolbar :color="color" :dense="!noRoute" fixed flat>
      <v-toolbar-title v-if="noRoute">
        <app-logo></app-logo>
      </v-toolbar-title>
      <v-icon class="back-icon" v-else dark @click="nav(route)">
          keyboard_arrow_left
      </v-icon>      
      <v-spacer></v-spacer>
      <app-menu v-if="noName"></app-menu>
      <v-toolbar-title v-else class="subheading">
          {{ title.toUpperCase() }}
      </v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
import { routerHelpers } from '../../router/routerHelpers'
import Menu from '../molecules/menu'
import Logo from '../atoms/Logo'

export default {
  components: {
    'app-menu': Menu,
    'app-logo': Logo
  },
  mixins: [routerHelpers],
  props: ['title', 'route'],
  computed: {
    noRoute () {
      return typeof this.route === 'undefined'
    },
    noName () {
      return typeof this.title === 'undefined'
    },
    color () {
      if (!this.noRoute) {
        return 'primary'
      }
    }
  }
}
</script>

<style scoped>
  .subheading {
    color: white !important;
  }
  .back-icon {
    cursor: pointer;
  }
</style>

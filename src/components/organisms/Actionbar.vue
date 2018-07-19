<template>
  <v-bottom-nav fixed class="on-top" :value="true" color="primary" :active.sync="state.selected">
    <v-btn v-for="item in state.items" :key="item.label" @click="nav(item.route)" :value="item.label" dark>
      <span :class="{highlight: state.selected === item.label}">{{ item.label }}</span>
      <v-icon color="accent">{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
import { routerHelpers } from '../../router/routerHelpers'

export default {
  mixins: [routerHelpers],
  computed: {
    state () {
      return this.$store.getters.actionbarState
    }
  }
}
</script>

<style scoped>
  .on-top {
    z-index: 100 !important;
  }
  .highlight {
    color: #7ec6d7;
    font-weight: bold;
  }
</style>

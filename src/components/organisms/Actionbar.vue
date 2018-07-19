<template>
  <div class="on-top">
    <div v-if="showBuffer" class="bottom-nav-buffer"></div>
    <v-bottom-nav :value="true" color="primary" :active.sync="state.selected">
      <v-btn v-for="item in state.items" :key="item.label" @click="nav(item.route)" :value="item.label" dark>
        <span :class="{highlight: state.selected === item.label}">{{ item.label }}</span>
        <v-icon color="accent">{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
import { routerHelpers } from '../../router/routerHelpers'

export default {
  mixins: [routerHelpers],
  computed: {
    state () {
      return this.$store.getters.actionbarState
    },
    showBuffer () {
      return this.state.selected === 'liked' || this.state.selected === 'browse'
    }
  }
}
</script>

<style scoped>
  .bottom-nav-buffer {
    background-color: rgba(255, 255, 255, 0);
    height: 40px;
  }
  .on-top {
    z-index: 100 !important;
    position: fixed;
    bottom: 0;
    width: 100%;
    transform: translateY(0%)
  }
  .highlight {
    color: #7ec6d7;
    font-weight: bold;
  }
</style>

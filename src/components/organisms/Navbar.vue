<template>
  <div>
    <v-toolbar :color="color" :dense="!menu" fixed flat class="on-top">
      <v-toolbar-title v-if="logo">
        <app-logo slot="activator" class="pointer" @click.native="quickGenerate()"></app-logo>
      </v-toolbar-title>
      <v-toolbar-title v-else class="subheading">{{ title.toUpperCase() }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <app-menu v-if="menu"></app-menu>
      <v-icon  v-else class="pointer" dark @click="back()">close</v-icon> 
    </v-toolbar>
  </div>
</template>

<script>
import Menu from '../molecules/menu'
import Logo from '../atoms/Logo'

export default {
  components: {
    'app-menu': Menu,
    'app-logo': Logo
  },
  props: {
    title: {
      type: String,
      required: false
    },
    menu: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'white'
    },
    logo: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    back () {
      this.$router.go('-1')
    },
    quickGenerate () {
      if (this.$store.getters.historyExists) {
        this.$store.dispatch('quickGenerate')
      }
    }
  }
}
</script>

<style scoped>
  .on-top {
    z-index: 100 !important;
  }
  .subheading {
    color: white !important;
  }
  .pointer {
    cursor: pointer;
  }
</style>

<template>
  <div>
    <app-navbar :title="nav.title" :route="nav.back"></app-navbar>
    <router-view :style="{
      marginTop: spaceTop + 'px',
    }"></router-view>
  </div>
</template>
<script>
  import Navbar from '../organisms/Navbar'

  export default {
    data () {
      return {
        spaceTop: 48
      }
    },
    components: {
      'app-navbar': Navbar
    },
    computed: {
      nav () {
        return this.$store.getters.getSettings.nav
      }
    },
    mounted () {
      this.spaceTop = document.querySelector('.v-toolbar').clientHeight
    }
  }
</script>
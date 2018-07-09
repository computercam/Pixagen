<template>
  <app-navbar :title="'Help'" color="primary" :logo="false" :menu="false"></app-navbar>
</template>

<script>
import Navbar from '../organisms/Navbar'

export default {
  components: {
    'app-navbar': Navbar
  },
  computed: {}
}
</script>

<style scoped>
</style>

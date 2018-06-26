<template>
  <app-navbar :title="'Help'" :route="'b0'"></app-navbar>
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

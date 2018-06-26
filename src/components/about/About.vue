<template>
  <app-navbar :title="'About'" :route="'b0'"></app-navbar>
</template>

<script>
import Navbar from '../organisms/Navbar'

export default {
  components: {
    'app-navbar': Navbar
  }
}
</script>

<style scoped>
</style>

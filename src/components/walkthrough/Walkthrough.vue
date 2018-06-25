<template>
  <app-navback :title="'Help'" :route="'b0'"></app-navback>
</template>

<script>
import NavbarBack from '../NavbarBack'

export default {
  components: {
    'app-navback': NavbarBack
  },
  computed: {}
}
</script>

<style scoped>
</style>

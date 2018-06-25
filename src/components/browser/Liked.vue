<template>
    <div>
      <app-picboard v-if="exists" :pictures="liked.data" :refreshOnchange="false" :columnsBig="true"></app-picboard>
      <app-blank v-else></app-blank>
    </div>
</template>
<script>
import PictureBoard from './PictureBoard'
import BlankPage from '../BlankPage'
export default {
  components: {
    'app-picboard': PictureBoard,
    'app-blank': BlankPage
  },
  computed: {
    liked () {
      return this.$store.getters.favs
    },
    exists () {
      return this.$store.getters.favExists
    }
  },
  watch: {
    exists () {
      this.$store.dispatch('setNavShow', true)
    }
  },
  mounted () {
    this.$store.dispatch('setActionbarSelected', 'liked')
  }
}
</script>
<style>
</style>
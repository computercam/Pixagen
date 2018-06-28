<template>
    <div>
      <app-picture-tiles v-if="exists" :pictures="liked.data" :big="true" :hover="false" :showBottom="true" :refreshOnchange="false" :columnsBig="true"></app-picture-tiles>
      <app-blank v-else></app-blank>
    </div>
</template>
<script>
import PictureTiles from '../../organisms/PictureTiles'
import Blank from '../../atoms/Blank'
export default {
  components: {
    'app-picture-tiles': PictureTiles,
    'app-blank': Blank
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
    this.$store.dispatch('setNavShow', true)
    this.$store.dispatch('setActionbarSelected', 'liked')
  }
}
</script>
<style>
</style>
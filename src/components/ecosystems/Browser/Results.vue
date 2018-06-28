<template>
  <div>
    <div v-if="exists">
      <app-picture-tiles-inf :current="current"></app-picture-tiles-inf>
    </div>
    <app-blank v-else></app-blank>
  </div>
</template>
<script>
  import PictureTilesInfinite from '../../organisms/PictureTilesInfinite'
  import Blank from '../../atoms/Blank'
  
  export default {
    components: {
      'app-picture-tiles-inf': PictureTilesInfinite,
      'app-blank': Blank
    },
    computed: {
      current () {
        return this.$store.getters.historyCurrent
      },
      exists () {
        return this.$store.getters.historyExists
      }
    },
    watch: {
      current () {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    },
    mounted () {
      this.$store.dispatch('setNavShow', true)
      this.$store.dispatch('setActionbarSelected', 'browse')
    }
  }
</script>
<style>
  .results-header {
    margin-bottom: 24px;
    margin-left: 4px;
  }

  .view-more {
    max-width: 460px;
    margin-top: 48px;
  }
</style>

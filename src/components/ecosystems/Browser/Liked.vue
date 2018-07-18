<template>
    <div>
      <div v-if="exists">
        <div class="animated fadeIn">
          <div class="liked-container">
            <app-picture-tiles :columns="columns" :pictures="liked.data" :hover="false" :showBottom="true" :columnsBig="false"></app-picture-tiles>
            </app-picture-tiles>
          </div>
        </div>
      </div>
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
  data () {
    return {
      initialized: false
    }
  },
  computed: {
    columns () {
      return this.$store.getters.layoutColumns.big
    },
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
  beforeDestroy() {
    this.initialized = false
  },
  mounted () {
    this.$store.dispatch('setNavShow', true)
    this.$store.dispatch('setActionbarSelected', 'liked')
    setTimeout(() => {
      this.initialized = true
    }, 250)
  }
}
</script>
<style scoped>
  .liked-container {
    padding-top: 20px !important;
  }
</style>
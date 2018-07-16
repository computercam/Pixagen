<template>
  <div>
    <div v-if="exists">
      <div v-if="initialized" class="animated fadeIn">
        <app-swiper v-if="swiperActive"></app-swiper>
        <div class="results-container">
          <v-layout row wrap class="results-header" :style="{ padding: margins }">
            <v-flex xs12>
              <h1 class="dark-text font-weight-regular">{{ getWords(current.keywords) }}</h1>
              <h3 class="light-text font-weight-regular">{{ getWords(current.categories) }}</h3>
            </v-flex>
          </v-layout>
          <app-picture-tiles :refresh="true" :moreButtonShow="true" :isRimg="isRimg" :pictures="current.metadata" :big="false" :hover="true" :showSwiper="true">
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
  import Swiper from '../../organisms/Swiper'
  
  export default {
    components: {
      'app-picture-tiles': PictureTiles,
      'app-blank': Blank,
      'app-swiper': Swiper
    },
    data () {
      return {
        initialized: false
      }
    },
    methods: {
      getWords (wordlist) {
        let str = ''
        wordlist.forEach((item, index, array) => {
          str += item.charAt(0).toUpperCase() + item.slice(1).replace(/[-_\+]+/gm, ' ')
          if (index < array.length - 1) str += ', '
        })
        return str.trim()
      }
    },
    computed: {
      current () {
        return this.$store.getters.historyCurrent
      },
      exists () {
        return this.$store.getters.historyExists
      },
      swiperActive () {
       return this.$store.getters.tilesData.length > 0
      },
      margins () {
        return this.$store.getters.margins
      },
      isRimg () {
        if (this.exists) {
          if (this.current.rimg !== false) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      }
    },
    mounted () {
      this.$store.dispatch('setActionbarSelected', 'browse')
      this.$store.dispatch('setNavShow', true)
      setTimeout(() => {
        this.initialized = true
      }, 250)
    }
  }
</script>
<style>
  .results-container {
    padding-top: 20px;
  }
  .results-header {
    margin-bottom: 24px;
    margin-left: 4px;
  }
</style>

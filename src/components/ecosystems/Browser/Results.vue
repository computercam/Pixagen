<template>
  <div class="results-container">
    <template v-if="exists">
      <v-layout row wrap class="results-header" :style="{ padding: margins }">
        <v-flex xs12>
          <h1 class="dark-text font-weight-regular">{{ getWords(current.keywords) }}</h1>
          <h3 class="light-text font-weight-regular">{{ getWords(current.categories) }}</h3>
        </v-flex>
      </v-layout>
      <app-picture-tiles :refresh="true" :moreButtonShow="true" :isRimg="isRimg" :pictures="current.metadata" :big="false" :hover="true">
      </app-picture-tiles>
    </template>
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
      this.$store.dispatch('setNavShow', true)
      this.$store.dispatch('setActionbarSelected', 'browse')
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

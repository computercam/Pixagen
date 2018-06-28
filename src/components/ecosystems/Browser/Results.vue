<template>
  <div>
    <div v-if="exists">
      <v-layout row wrap class="results-header" :style="{ padding: margins }">
        <v-flex xs12>
          <h1 class="dark-text">{{ getWords(current.keywords) }}</h1>
          <h3 class="light-text">{{ getWords(current.categories) }}</h3>
        </v-flex>
      </v-layout>
      <app-picture-tiles :pictures="current.metadata" :refresh="true" :big="false" :hover="true">
      </app-picture-tiles>
      <v-container fluid :style="{ marginBottom: contentBuffer,  padding: margins }">
        <v-layout row wrap justify-center>
          <v-flex xs12 class="view-more">
            <v-btn rasied block large round color="primary" @click.native="quickGenerate()">Generate More Images</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <app-blank v-else></app-blank>
  </div>
</template>
<script>
  import PictureTiles from '../../organisms/PictureTiles'
  import Blank from '../../atoms/Blank'
  import dummy from '../../../assets/dummy/dummy.json'
  
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
      },
      quickGenerate () {
        let last = this.$store.getters.historyLastGenerate
        if (last.option === 3) {
          last.option = 1
          last.rimg = ''
        }
        this.$store.dispatch('generateNew', last)
      }
    },
    computed: {
      margins () {
        return this.$store.getters.margins
      },
      contentBuffer () {
        return this.$store.getters.contentBuffer
      },
      dummyData () {
        return {
          pictures: dummy,
          keywords: ['Saku+hanga', 'Shades'],
          categories: ['Lol', 'Swag'],
          exists: true
        }
      },
      current () {
        return this.$store.getters.historyCurrent
      },
      exists () {
        return this.$store.getters.historyExists
      }
    },
    watch: {
      current () {
        this.$store.dispatch('setNavShow', true)
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

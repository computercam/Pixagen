<template>
  <div>
    <v-layout row wrap class="results-header" :style="{ padding: margins }">
      <v-flex xs12>
        <h1 class="dark-text">{{ getWords(current.keywords) }}</h1>
        <h3 class="light-text">{{ getWords(current.categories) }}</h3>
      </v-flex>
    </v-layout>
    <app-picture-tiles :pictures="current.metadata" :big="false" :hover="true">
    </app-picture-tiles>
    <!-- <infinite-loading @infinite="infiniteHandler"></infinite-loading> -->
    <v-container fluid :style="{ marginBottom: contentBuffer,  padding: margins }">
      <v-layout row wrap justify-center>
        <v-flex xs12 class="view-more">
          <v-btn rasied block large round color="primary" @click.native="quickGenerate()">Generate More Images</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import PictureTiles from '../organisms/PictureTiles'
  import InfiniteLoading from 'vue-infinite-loading'
  
  export default {
    components: {
      'app-picture-tiles': PictureTiles,
      InfiniteLoading
    },
    props: {
      current: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        stream: []
      }
    },
    methods: {
      // infiniteHandler ($state) {
      //   setTimeout(() => {
      //     const temp = []
      //     for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
      //       temp.push(i)
      //     }
      //     this.list = this.list.concat(temp)
      //     $state.loaded()
      //   }, 1000)
      // },
      // getTitle () {
      //   let title = this.getWords(this.current.keywords)
      //   if (this.current.rimg || this.current.sbi) {
      //     if (this.current.metadata[0].pt.length > 0) {
      //       title = this.current.metadata[0].pt
      //     }
      //   }
      //   return title
      // },
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
        if (last.option === 3 || last.option === 4) {
          last.option = 1
          last.rimg = ''
        }
        this.$store.dispatch('generateNew', last)
      }
    },
    computed: {
      // infinite () {
      //   return this.$store.getters.getInfinite
      // },
      margins () {
        return this.$store.getters.margins
      },
      contentBuffer () {
        return this.$store.getters.contentBuffer
      }
    },
    mounted () {
      // this.stream = this.ifinite.pool.slice(0, 10)
    }
  }
</script>
<style scoped>
  .view-more {
    max-width: 500px;
  }
</style>
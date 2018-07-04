<template>
  <div>
    <template v-if="exists">
      <v-layout row wrap class="results-header" :style="{ padding: margins }">
        <v-flex xs12>
          <h1 class="dark-text font-weight-light">{{ getWords(current.keywords) }}</h1>
          <h3 class="light-text font-weight-light">{{ getWords(current.categories) }}</h3>
        </v-flex>
      </v-layout>
      <app-picture-tiles :pictures="stream.data" :big="false" :hover="true">
      </app-picture-tiles>
      <v-container v-if="moreButton.show" fluid :style="{ marginBottom: contentBuffer,  padding: margins }">
        <v-layout row wrap justify-center>
          <v-flex xs12 class="view-more">
            <v-btn rasied block large round color="primary" @click.native="moreButtonHandler">{{ moreButton.text }}</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
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
    data() {
      return {
        stream: {
          data: [],
          loading: false,
          range: {
            start: 0,
            end: 20
          }
        },
        moreButton: {
          show: true,
          mode: 'more',
          text: 'Show more images'
        }
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
      },
      quickGenerate () {
        let last = this.$store.getters.historyLastGenerate
        if (last.option === 3 || last.option === 4) {
          last.option = 1
          last.rimg = ''
        }
        this.$store.dispatch('generateNew', last)
      },
      moreButtonCheck () {
        if (this.stream.range.end > this.current.metadata.length) {
          this.moreButton.text = 'Generate new images'
          this.moreButton.mode = 'generate'
        }
      },
      moreButtonHandler () {
        if (this.moreButton.mode === 'more') {
          this.appendStream()
        } else {
          this.quickGenerate()
          this.moreButton.text = 'Show more images'
          this.moreButton.mode = 'more'
        }
      },
      resetStream () {
        this.stream.range.start = 0
        this.stream.range.end = 20
        this.stream.data = this.current.metadata.slice(this.stream.range.start, this.stream.range.end)
        this.moreButtonCheck()
      },
      appendStream () {
        if (this.stream.range.end < this.current.metadata.length) {
          this.stream.range.start = this.stream.range.end, 
          this.stream.range.end += 30
          let temp = this.current.metadata.slice(this.stream.range.start, this.stream.range.end)
          this.stream.data = this.stream.data.concat(temp)
        }
        this.moreButtonCheck()
      },
      scrollOffset (num) {
        let offset = document.documentElement.scrollHeight - document.documentElement.clientHeight
        return offset - (offset / num)
      },
      onScroll() {
        if (window.scrollY >= this.scrollOffset(6)) {
          if (!this.stream.loading) {
            this.stream.loading = true
            this.appendStream()
            setTimeout(() => {
              this.stream.loading = false
            }, 1000)
          }
        }
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
      contentBuffer () {
        return this.$store.getters.contentBuffer
      }
    },
    watch: {
      current () {
        this.resetStream()
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    },
    mounted () {
      this.resetStream()
      this.$store.dispatch('setNavShow', true)
      this.$store.dispatch('setActionbarSelected', 'browse')
      window.addEventListener('scroll', this.onScroll)
    },
    destroyed () {
      window.removeEventListener('scroll', this.onScroll)
    },
  }
</script>
<style>
  .results-header {
    margin-bottom: 24px;
    margin-left: 4px;
  }
  
  .view-more {
    max-width: 460px !important ;
    margin-top: 48px;
  }
</style>

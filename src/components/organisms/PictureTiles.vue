<template>
  <div>
    <masonry :cols="columns" :gutter="gutter" :style="{ padding: margins }" v-scroll="onScroll" v-resize="onResize">
      <app-picture-tile
      v-for="(item, index) in stream.data" 
      :key="getUID()" 
      :item="item"
      :hover="hover"
      :showExplore="!(isRimg && index === 0)"
      :showBottom="showBottom"
      :style="{ marginBottom: contentBuffer }"
      >
    </app-picture-tile>
  </masonry>
  <v-container v-if="moreButtonShow" fluid :style="{ marginBottom: contentBuffer,  padding: margins }">
    <v-layout row wrap justify-center>
      <v-flex xs12 class="view-more">
        <v-btn rasied block large round color="primary" @click.native="moreButtonHandler">{{ moreButton.text }}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
  import PictureTile from '../organisms/PictureTile'
  
  export default {
    components: {
      'app-picture-tile': PictureTile
    },
    props: {
      pictures: {
        type: Array,
        required: true
      },
      big: {
        type: Boolean,
        default: false
      },
      hover: {
        type: Boolean,
        default: true
      },
      showBottom: {
        type: Boolean,
        default: false
      },
      isRimg: {
        type: Boolean,
        default: false
      },
      refresh: {
        type: Boolean,
        default: false
      },
      moreButtonShow: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        stream: {
          data: [],
          range: {
            start: 0,
            end: 20
          }
        },
        moreButton: {
          mode: 'more',
          text: 'Show more images'
        }
      }
    },
    methods: {
      getUID () {
        return window.btoa(Math.floor(Math.random() * (100 ** 8))).replace(/=/gm, '')
      },
      onResize () {
        this.$store.dispatch('onResize', window.innerWidth)
      },
      quickGenerate () {
        this.$store.dispatch('quickGenerate')
      },
      moreButtonCheck () {
        if (this.stream.range.end > this.pictures.length) {
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
        this.stream.data = this.pictures.slice(this.stream.range.start, this.stream.range.end)
        this.moreButtonCheck()
      },
      appendStream () {
        if (this.stream.range.end < this.pictures.length) {
          this.stream.range.start = this.stream.range.end
          this.stream.range.end += 30
          let temp = this.pictures.slice(this.stream.range.start, this.stream.range.end)
          this.stream.data = this.stream.data.concat(temp)
        }
        this.moreButtonCheck()
      },
      scrollOffset (num) {
        let offset = document.documentElement.scrollHeight - document.documentElement.clientHeight
        return offset - (offset / num)
      },
      onScroll () {
        if (window.scrollY >= this.scrollOffset(4)) {
          if (!this.stream.loading) {
            this.stream.loading = true
            this.appendStream()
            setTimeout(() => {
              this.stream.loading = false
            }, 1000)
          }
        }
        this.$store.dispatch('onScroll', {
          y: window.scrollY,
          cH: document.documentElement.clientHeight,
          sH: document.documentElement.scrollHeight
        })
      }
    },
    watch: {
      pictures () {
        if (this.refresh) {
          window.scrollTo({ top: 0, behavior: 'instant' })
          this.resetStream()
        }
      }
    },
    computed: {
      margins () {
        return this.$store.getters.margins
      },
      contentBuffer () {
        return this.$store.getters.contentBuffer
      },
      columns () {
        if (this.big) {
          return this.$store.getters.layoutColumns.big
        } else {
          return this.$store.getters.layoutColumns.normal
        }
      },
      gutter () {
        return this.$store.getters.layoutGutters
      }
    },
    mounted () {
      this.resetStream()
      this.$store.dispatch('onResize', window.innerWidth)
    }
  }
</script>
<style scoped>
  .view-more {
    max-width: 460px !important ;
    margin-top: 48px;
  }  
</style>
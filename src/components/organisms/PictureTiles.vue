<template>
  <div>
    <masonry :cols="columns" :gutter="gutter" :style="{ padding: margins, overflow: 'hidden' }" v-scroll="onScroll" v-resize="onResize">
      <app-picture-tile v-for="(item, index) in stream" :key="getUID()" :item="item" :hover="showHover" :showExplore="!(isRimg && index === 0)"
        :showBottom="showBottom" :style="{ marginBottom: contentBuffer }" @click.native="fullscreenToggle(index, $event)">
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
  import PictureTile from './PictureTile'
  import ExploreBtn from '../atoms/ExploreBtn'

  export default {
    components: {
      'app-picture-tile': PictureTile,
      'app-explore-btn': ExploreBtn
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
      },
      showSwiper: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        streamLoading: false,
        moreButton: {
          mode: 'more',
          text: 'Show more images'
        }
      }
    },
    methods: {
      fullscreenToggle (index, e) {
        if (this.showSwiper) {
          let isTarget = e.target.getAttribute('class')
          isTarget = isTarget.includes('swiper-target')
          if (isTarget) {
            this.$store.dispatch('swiperToggleShow', { index: index })
          }
        }
      },
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
        if (this.stream.length >= this.pictures.length) {
          this.moreButton.text = 'Generate new images'
          this.moreButton.mode = 'generate'
        }
      },
      moreButtonHandler () {
        if (this.moreButton.mode === 'more') {
          this.$store.dispatch('tilesAppend', { pictures: this.pictures })
        } else {
          this.moreButton.text = 'Show more images'
          this.moreButton.mode = 'more'
          this.quickGenerate()
        }
      },
      scrollOffset (num) {
        let offset = document.documentElement.scrollHeight - document.documentElement.clientHeight
        return offset - (offset / num)
      },
      onScroll () {
        if (window.scrollY >= this.scrollOffset(4)) {
          this.$store.dispatch('tilesAppend', { pictures: this.pictures })
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
          this.$store.dispatch('tilesReset', { pictures: this.pictures })
        }
      },
      stream () {
        this.moreButtonCheck()
      },
      swiperActive () {
        if (this.swiperActive === false) {
          if (this.swiperState.focus) {
            let list = Array.from(document.querySelectorAll('.picture'))
            let url = this.swiperState.last
            let index = list.findIndex((el) => {
              return el.style.backgroundImage.includes(url)
            })
            let el = list[index]
            let top = el.getBoundingClientRect().top
            top = Math.ceil(top + window.pageYOffset - 100)
            if (top < 0) {
              top = 0
            }
            window.scroll({ top: top, behavior: 'instant' })
          }
        }
      }
    },
    computed: {
      stream () {
        return this.$store.getters.tilesData
      },
      swiperState () {
        return this.$store.getters.getSwiper
      },
      swiperActive () {
        return this.swiperState.active
      },
      showHover () {
        let show = this.hover
        if ('ontouchstart' in document.documentElement) {
          show = false
        }
        return show
      },
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
      this.$store.dispatch('tilesReset', { pictures: this.pictures })
      this.$store.dispatch('onResize', window.innerWidth)
    }
  }
</script>
<style scoped>
  .view-more {
    max-width: 460px !important;
    margin-top: 48px;
  }
</style>
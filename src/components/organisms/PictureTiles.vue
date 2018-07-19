<template>
  <div>
    <masonry :cols="columns" :gutter="gutter" :style="{ padding: margins, overflow: 'hidden' }" v-scroll="onScroll" v-resize="onResize">
      <app-picture-tile v-for="(item, index) in stream" :index="index" :incrementor="incrementor" :key="item.tu" :columns="columns" :item="item" :hover="showHover" :showExplore="item.rimg !== false"
        :showBottom="showBottom" :style="{ marginBottom: contentBuffer }" @click.native="fullscreenToggle(index, $event)">
      </app-picture-tile>
    </masonry>
    <v-container fluid :style="{ marginBottom: contentBuffer }">
      <v-layout row wrap justify-center>
        <v-flex v-if="moreButtonShow && moreButtonActive" xs12 class="view-more animated fadeIn" :style="{ paddingBottom: buttonBottomPadding }">
          <v-btn rasied block large round color="primary" @click.native="moreButtonHandler">Generate More Images</v-btn>
        </v-flex>
        <v-progress-circular v-if="progressCheck" indeterminate :width="7" :size="70" color="accent"></v-progress-circular>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import PictureTile from './PictureTile'
  import iPhoneX from '../../iPhoneX'

  export default {
    components: {
      'app-picture-tile': PictureTile
    },
    props: {
      pictures: {
        type: Array,
        required: true
      },
      columns: {
        type: Object,
        required: true
      },
      hover: {
        type: Boolean,
        default: true
      },
      showBottom: {
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
        moreButtonActive: false,
        tilesLoading: false,
        incrementor: 0,
        scrollY: 0
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
      onResize () {
        this.$store.dispatch('onResize', window.innerWidth)
      },
      quickGenerate () {
        this.$store.dispatch('quickGenerate')
      },
      moreButtonCheck () {
        if (this.stream.length >= this.pictures.length) {
          setTimeout(() => {
            this.moreButtonActive = true
          }, 500)
        }
      },
      moreButtonHandler () {
        this.quickGenerate()
      },
      scrollEnd (num) {
        return document.documentElement.scrollHeight - document.documentElement.clientHeight - num
      },
      onScroll () {
        this.scrollY = window.scrollY
      }
    },
    watch: {
      pictures () {
        if (this.refresh) {
          window.scrollTo({ top: 0, behavior: 'instant' })
          this.$store.dispatch('tilesReset', { pictures: this.pictures })
          this.moreButtonActive = false
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
      },
      scrollY () {
        if (this.stream.length < this.pictures.length) {
          if (this.scrollY >= this.scrollEnd(200) && this.tilesLoading === false) {
            this.tilesLoading = true
            if (screen.width < 600) {
              this.incrementor = 20
              this.$store.dispatch('tilesAppend', { pictures: this.pictures, overide: this.incrementor })
            } else {
              this.$store.dispatch('tilesAppend', { pictures: this.pictures })
            }
            setTimeout(() => {
              this.tilesLoading = false
            }, 100)
          }
        }
        this.$store.dispatch('onScroll', {
          y: window.scrollY,
          cH: document.documentElement.clientHeight,
          sH: document.documentElement.scrollHeight
        })
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
      progressCheck () {
        if (this.moreButtonActive === false) {
          return true
        } else {
          return false
        }
      },
      margins () {
        return this.$store.getters.margins
      },
      contentBuffer () {
        return this.$store.getters.contentBuffer
      },
      gutter () {
        return this.$store.getters.layoutGutters
      },
      buttonBottomPadding () {
        if (iPhoneX()) {
          return '38px'
        } else {
          return '0px'
        }
      }
    },
    mounted () {
      if (screen.width < 600) {
        this.incrementor = 20
        this.$store.dispatch('tilesReset', { pictures: this.pictures, overide: this.incrementor })
      } else {
        this.incrementor = this.$store.getters.tilesIncrementor
        this.$store.dispatch('tilesReset', { pictures: this.pictures })
      }
      this.$store.dispatch('onResize', window.innerWidth)
    },
  }
</script>
<style scoped>
  .view-more {
    max-width: 460px !important;
    margin-top: 48px;
  }
  .masonry-tile {
    float: left;
  }
</style>
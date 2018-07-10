<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="fullscreen.active" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card class="swiper-container">
          <swiper :options="fullscreen.options" ref="swiper" @slideChangeTransitionEnd="swiperChange()">
            <swiper-slide v-if="showSwiper" v-for="(item, index) in stream.data" :key="index" :style="{ backgroundImage: 'url(' + item.tu + ')', height: swiperImageArea(), backgroundSize: swiperImageSize() }" class="slide">
            </swiper-slide>
          </swiper>
          <v-card-actions class="swiper-actions">
            <v-btn icon @click.native="fullscreenToggle(0, $event)">
              <v-icon color="white">close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="swiperShowExplore()" flat round color="white" class="btn-explore" @click.native="swiperExplore()">
              <v-icon small left color="white">image_search</v-icon>
              Explore
            </v-btn>
            <v-btn class="btn-favorite" @click.native="swiperToggleFav()" icon>
              <v-icon color="white" :class="{ liked: swiperIsFav}">favorite</v-icon>
            </v-btn>
            <v-btn icon @click.native.stop="swiperShare()">
              <v-icon color="white">share</v-icon>
            </v-btn>
            <v-btn icon :href="swiperCurrent().ou" target="_blank">
              <v-icon color="white">get_app</v-icon>
            </v-btn>
            <v-btn icon :href="swiperCurrent().ru" target="_blank">
              <v-icon color="white">open_in_new</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <masonry :cols="columns" :gutter="gutter" :style="{ padding: margins, overflow: 'hidden' }" v-scroll="onScroll" v-resize="onResize">
      <app-picture-tile v-for="(item, index) in stream.data" :key="getUID()" :item="item" :hover="showHover" :showExplore="!(isRimg && index === 0)"
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
  import 'swiper/dist/css/swiper.css'
  import PictureTile from './PictureTile'
  import ExploreBtn from '../atoms/ExploreBtn'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    components: {
      'app-picture-tile': PictureTile,
      'app-explore-btn': ExploreBtn,
      swiper,
      swiperSlide
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
        fullscreen: {
          active: false,
          index: 0,
          options: {
            loop: false,
            mode: 'horizontal',
            lazy: true
          }
        },
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
      fullscreenToggle (index, e) {
        if (this.showSwiper) {
          if (!this.fullscreen.active) {
            let isTarget = e.target.getAttribute('class')
            isTarget = isTarget.includes('swiper-target')
            if (isTarget) {
              this.fullscreen.index = index
              this.swiper.slideTo(this.fullscreen.index, 0)
              this.fullscreen.active = true
            }
          } else {
            this.swiperExitScroll()
            this.fullscreen.active = false
          }
        }
      },
      swiperChange () {
        this.fullscreen.index = this.swiper.activeIndex
        if (this.fullscreen.index > this.stream.data.length - 2) {
          this.appendStream()
        }
      },
      swiperShare () {
        this.$store.dispatch('shareDialogOpen', this.swiperCurrent().ou)
      },
      swiperToggleFav () {
        this.$store.dispatch('toggleFav', this.swiperCurrent())
      },
      swiperCurrent () {
        return this.pictures[this.fullscreen.index]
      },
      swiperExplore () {
        this.fullscreen.active = false
        setTimeout(() => {
          this.$store.dispatch('generateNew', {
            option: 3,
            rimg: this.swiperCurrent().rimg,
            keywords: this.swiperCurrent().okeys,
            categories: this.swiperCurrent().ocats
          })
        }, 350)
      },
      swiperShowExplore () {
        let firstRimg = this.$store.getters.historyCurrent.rimg !== false
        if (firstRimg && this.fullscreen.index === 0) {
          return false
        } else {
          return this.swiperCurrent().rimg !== false
        }
      },
      swiperImageArea () {
        return window.innerHeight - 52 + 'px'
      },
      swiperImageSize () {
        let vpw = window.innerWidth
        let size = ''
        if (vpw >= 1375) {
          size = '35%'
        }
        if (vpw <= 1000 || vpw < 1375) {
          size = '45%'
        }
        if (vpw <= 762) {
          size = '50%'
        }
        if (vpw <= 500) {
          size = 'contain'
        }
        return size
      },
      swiperExitScroll () {
        let url = this.swiperCurrent().tu
        let list = Array.from(document.querySelectorAll('.picture'))
        let index = list.findIndex((el) => {
          return el.style.backgroundImage.includes(url)
        })
        let top = list[index].getBoundingClientRect().top
        top = Math.ceil(top + window.pageYOffset - 30)
        if (top < 0) {
          top = 0
        }
        window.scroll({ top: top, behavior: 'instant' })
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
        if (this.stream.range.end >= this.pictures.length) {
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
          this.stream.range.end += 20
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
      },
      swiperIsFav () {
        return this.$store.getters.isFav(this.swiperCurrent().ou) !== -1
      },
      swiper () {
        return this.$refs.swiper.swiper
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
    max-width: 460px !important;
    margin-top: 48px;
  }

  .liked {
    color: #26c6da !important;
  }

  .swiper-container {
    background-color: white;
  }

  .swiper-actions {
    background-color: #7b7594;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 52px;
  }

  .slide {
    background-position: center;
    width: 100vw;
  }
</style>
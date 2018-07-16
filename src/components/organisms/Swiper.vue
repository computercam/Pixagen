<template>
  <v-dialog v-model="swiperState.active" fullscreen hide-overlay transition="slide-x-transition">
    <v-card class="swiper-card-container">
      <swiper :options="swiperState.options" ref="swiper" @slideChangeTransitionEnd="swiperChange()">
        <swiper-slide v-if="swiperActive" v-for="(item, index) in stream" :key="index" :style="{ backgroundImage: 'url(' + item.tu + ')', height: swiperImageArea(), backgroundSize: swiperImageSize() }"
          class="slide">
        </swiper-slide>
      </swiper>
      <v-card-actions v-if="swiperActive" class="swiper-actions">
        <v-btn icon @click.native="swiperExit()">
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
        <v-btn icon :href="swiperCurrent.ou" target="_blank">
          <v-icon color="white">get_app</v-icon>
        </v-btn>
        <v-btn icon :href="swiperCurrent.ru" target="_blank">
          <v-icon color="white">open_in_new</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        swiper: null
      }
    },
    methods: {
      swiperExit () {
        this.$store.dispatch('swiperToggleShow', { last: this.swiperCurrent.tu, focus: true })
      },
      swiperChange () {
        this.$store.dispatch('swiperIndex', this.swiper.activeIndex)
        if (this.swiperState.index > this.stream.length - 2) {
          this.$store.dispatch('tilesAppend', { pictures: this.pictures })
        }
      },
      swiperShare () {
        this.$store.dispatch('shareDialogOpen', this.swiperCurrent.ou)
      },
      swiperToggleFav () {
        this.$store.dispatch('toggleFav', this.swiperCurrent)
      },
      swiperExplore () {
        this.$store.dispatch('swiperToggleShow', { focus: false })
        this.$store.dispatch('generateNew', {
          option: 3,
          rimg: this.swiperCurrent.rimg,
          keywords: this.swiperCurrent.okeys,
          categories: this.swiperCurrent.ocats
        })
      },
      swiperShowExplore () {
        if (this.swiperActive) {
          let firstRimg = this.$store.getters.historyCurrent.rimg !== false
          if (firstRimg && this.swiperState.index === 0) {
            return false
          } else {
            return this.swiperCurrent.rimg !== false
          }
        } else {
          return false
        }
        
      },
      swiperImageArea () {
        return window.innerHeight - 104 + 'px'
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
      }
    },
    watch: {
      swiperActive () {
        if (this.swiperActive === true) {
          this.swiper.slideTo(this.swiperState.index, 0)
        }
      }
    },
    computed: {
      pictures () {
        return this.$store.getters.historyCurrent.metadata
      },
      stream () {
        return this.$store.getters.tilesData
      },
      swiperState () {
        return this.$store.getters.getSwiper
      },
      swiperActive () {
        return this.swiperState.active
      },
      swiperIsFav () {
        if (this.swiperActive) {
          return this.$store.getters.isFav(this.swiperCurrent.ou) !== -1
        }
      },
      swiperCurrent () {
        let current = this.stream[this.swiperState.index]
        if (typeof current !== 'undefined') {
          return current
        } else {
          this.stream[0]
        }
      }
    },
    mounted () {
      this.swiper = this.$refs.swiper.swiper
    },
    destroyed () {
      this.$store.dispatch('swiperIndex', 0)
    }
  }
</script>
<style scoped>
  .swiper-card-container {
    background-color: white;
  }
  .swiper-container {
    z-index: 40;
  }
  .swiper-actions {
    background-color: #7b7594;
    width: 100%;
    position: absolute;
    bottom: 0;
    padding-bottom: 27px;
    z-index: 41;
  }
  .slide {
    background-position: center;
    width: 100vw;
  }
  .liked {
    color: #26c6da !important;
  }
</style>
<template>
  <div v-if="picboardShow" class="root-container animated fadeIn">
    <v-layout v-if="titlesShow" row wrap class="results-header" :style="{ padding: spaceAround }">
      <v-flex xs12>
        <h1 class="dark-text">{{ getWords(info.keywords) }}</h1>
        <h3 class="light-text">{{ getWords(info.categories) }}</h3>
      </v-flex>
    </v-layout>
    <masonry class="results" :cols="columns" :gutter="gutter" :style="{ padding: spaceAround }" v-resize.quiet="onResize" v-scroll="onScroll">
      <v-card raised hover class="result-card" v-for="(item, index) in pictures" :key="getUID()" :style="{  marginBottom: spaceBelow }">
        <v-container fluid class="result-card-media" @mouseenter="imageHover($event)" @mouseleave="imageLeave($event)">
          <div v-if="!columnsBig" class="result-card-media-actions fill-space animated fadeIn">
            <v-layout class="fill-height" row wrap align-content-space-between>
              <v-flex xs12>
                <v-btn depressed round color="primary" class="btn-explore" v-if="item.rimg" @click.native="explore(item.rimg)" >
                  <v-icon small left>image_search</v-icon>
                  Explore
                </v-btn>
              </v-flex>
              <v-flex xs12>
                <v-btn depressed icon large :data-url="item.ou" class="btn-favorite" @click.native="toggleFav(item, $event)">
                  <v-icon class="result-card-liked" color="white">favorite</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <div class="result-card-media-actions fill-space overlay">
            </div>
          </div>
          <div v-lazy:background-image="item.tu" class="result-card-media-image fill-space" :style="{ height: getImageHeight(item.th) + 'px' }"></div>
        </v-container>
        <v-card-title primary-title v-if="columnsBig">
            <div>
              <h3 v-if="item.pt" class="dark-text title mb-0">{{ item.pt }}</h3>
              <p v-if="item.s" class="dark-text body-1">{{ item.s }}</p>
              <p class="light-text caption grey--text">Width: {{ item.ow }}, Height: {{ item.oh}}</p>
              <p v-if="item.st" class="light-text caption grey--text">Source: {{ item.st }}</p>
            </div>
          </v-card-title>
          <v-card-actions v-if="columnsBig">
            <v-btn :data-url="item.ou" class="btn-favorite" @click.native="toggleFav(item, $event)" icon>
              <v-icon class="dark-text result-card-liked">favorite</v-icon>
            </v-btn>
            <v-btn icon @click.native.stop="share(item.ou)">
              <v-icon class="dark-text">share</v-icon>
            </v-btn>
            <v-btn icon :href="item.ou" target="_blank">
              <v-icon class="dark-text">get_app</v-icon>
            </v-btn>
            <v-btn icon :href="item.ru" target="_blank">
              <v-icon class="dark-text">open_in_new</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn depressed round color="primary" class="btn-explore" v-if="item.rimg" @click.native="explore(item.rimg)" >
              <v-icon small left>image_search</v-icon>
              Explore
            </v-btn>
          </v-card-actions>
      </v-card>
    </masonry>
    <v-container v-if="generateMoreShow" fluid :style="{ marginBottom: spaceBelow,  padding: spaceAround  }">
      <v-layout row wrap justify-center>
        <v-flex xs12 class="view-more">
          <v-btn rasied block large round color="primary" @click.native="quickGenerate()">Generate More Images</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    props: {
      pictures: {
        type: Array,
        required: true
      },
      refreshOnchange: {
        type: Boolean,
        default: true
      },
      info: {
        type: Object,
        required: false
      },
      titlesShow: {
        Boolean,
        default: false
      },
      generateMoreShow: {
        Boolean,
        default: false
      },
      columnsBig: {
        Boolean,
        default: false
      }
    },
    data () {
      return {
        gutter: {
          default: 32,
          1000: 24,
          762: 16,
          350: 10
        },
        viewportWidth: 0,
        lastScroll: 0,
        scrollTimeout: {
          top: null,
          bottom: null
        }
      }
    },
    methods: {
      share (url) {
        this.$store.dispatch('shareDialogOpen', url)
      },
      explore (rimg) {
        this.$store.dispatch('generateNew', { option: 3, rimg: rimg })
      },
      isFav (url) {
        return this.$store.getters.isFav(url) !== -1
      },
      toggleFav (data, event) {
        let el = event.target.children[0]
        if (this.isFav(data.ou)) {
          el.classList.remove('fav-active')
        } else {
          el.classList.add('fav-active')
        }
        this.$store.dispatch('toggleFav', data)
      },
      getUID () {
        return window.btoa(Math.floor(Math.random() * (100 ** 8))).replace(/=/gm, '')
      },
      getWords (wordlist) {
        let str = ''
        wordlist.forEach((item, index, array) => {
          str += item.charAt(0).toUpperCase() + item.slice(1).replace(/[\+-_]+/gm, ' ')
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
      },
      onResize () {
        this.viewportWidth = window.innerWidth
      },
      contentHeight () {
        return document.documentElement.scrollHeight - document.documentElement.clientHeight
      },
      onScroll () {
        let pos = document.documentElement.scrollTop || document.body.scrollTop
        if (pos >= 0 && pos >= this.lastScroll) {
          this.lastScroll = pos
          this.$store.dispatch('setNavShow', false)
        } else {
          this.lastScroll = pos
          this.$store.dispatch('setNavShow', true)
        }
      },
      getImageHeight (h) {
        return h + (this.viewportWidth / 10)
      },
      imageHover (event) {
        if (!this.columnsBig) {
          let el = event.target.children
          el[0].style.display = 'block'
          el[1].style.filter = 'saturate(90%) contrast(90%)'
        }
      },
      imageLeave (event) {
        if (!this.columnsBig) {
          let el = event.target.children
          el[0].style.display = 'none'
          el[1].style.filter = 'saturate(100%) contrast(100%)'
        }
      }
    },
    computed: {
      columns () {
        let columns
        if (this.columnsBig) {
          columns = {
            default: 4,
            1600: 3,
            1180: 2,
            762: 1
          }
        } else {
          columns = {
            default: 5,
            1375: 4,
            1080: 3,
            762: 2,
            350: 1
          }
        }
        return columns
      },
      spaceAround () {
        let gutter
        if (this.viewportWidth >= 1180) {
          gutter = this.viewportWidth / 14
        } else if (this.viewportWidth >= 740) {
          gutter = this.viewportWidth / 12
        } else {
          gutter = this.gutter['762']
        }
        return `0 ${gutter}px`
      },
      spaceBelow () {
        let gutter
        if (this.viewportWidth >= 1000) {
          gutter = this.viewportWidth / 32
        } else if (this.viewportWidth >= 740) {
          gutter = this.viewportWidth / 30
        } else {
          gutter = this.gutter.default
        }
        return gutter + 'px'
      },
      picboardShow () {
        return this.$store.getters.getPicboardShow
      }
    },
    watch: {
      pictures () {
        if (this.refreshOnchange) {
          window.scrollTo({ top: 0, behavior: 'instant' })
        }
      }
    },
    mounted () {
      setTimeout(() => {
        this.$store.dispatch('setPicboardShow', true)
      }, 100)
      setTimeout(() => {
        let els = document.querySelectorAll('.btn-favorite')
        els.forEach(el => {
          let url = el.getAttribute('data-url')
          let icon = el.querySelector('.result-card-liked')
          if (this.isFav(url)) {
            icon.classList.add('fav-active')
          }
        })
      }, 400)
      this.viewportWidth = window.innerWidth
    },
    destroyed () {
      this.$store.dispatch('setPicboardShow', false)
    }
  }
</script>

<style scoped>
  .root-container {
    padding-top: 24px !important;
  }

  .title,
  .body-1 {
    word-break: break-all !important;
  }

  .overlay {
    border-radius: 10px;
    background: linear-gradient(-180deg, rgba(108, 105, 116, 0.3), rgba(108, 105, 116, 0.7), black) !important;
    opacity: 0.5;
    display: block !important;
  }

  .fill-space {
    height: 100%;
    width: 100%;
  }


  .results {
    margin-bottom: 40px;
  }

  .results-header {
    margin-bottom: 24px;
    margin-left: 4px;
  }

  .result-card {
    border-radius: 10px
  }

  .body-1 {
    margin-top: 14px !important;
  }

  .view-more {
    max-width: 460px;
    margin-top: 48px;
  }

  .result-card-media {
    border-radius: 10px;
    padding: 0px;
    position: relative;
  }

  .result-card-media-actions {
    border-radius: 10px;
    position: absolute;
    display: none;
    z-index: 10;
  }

  .result-card-media-image {
    border-radius: 10px;
    background-size: cover;
    background-position: center;
  }

  .result-card-media-image[lazy=loading] {
    background: linear-gradient(135deg, #6beeff, #7b7292, #b68eff) !important;
    background-size: 300% 300% !important;
    animation: Gradient 2s ease infinite !important;
    transition: all 750ms !important;
    opacity: 0.9 !important;
  }

  .btn-explore {
    z-index: 100; 
    float:right; 
    margin: 10px; 
  }

  .btn-favorite {
    z-index: 100
  }

  @keyframes Gradient {
    0% {
      background-position: 0% 50%
    }
    50% {
      background-position: 100% 50%
    }
    100% {
      background-position: 0% 50%
    }
  }
  
  .fadeIn { 
    -webkit-animation: fadeIn 450ms; /* Safari 4+ */ 
    -moz-animation:    fadeIn 450ms; /* Fx 5+ */ 
    -o-animation:      fadeIn 450ms; /* Opera 12+ */ 
    animation:         fadeIn 450ms; /* IE 10+, Fx 29+ */ 
  }

  .fadeOut { 
    -webkit-animation: fadeOut 450ms; /* Safari 4+ */ 
    -moz-animation:    fadeOut 450ms; /* Fx 5+ */ 
    -o-animation:      fadeOut 450ms; /* Opera 12+ */ 
    animation:         fadeOut 450ms; /* IE 10+, Fx 29+ */ 
  }
</style>
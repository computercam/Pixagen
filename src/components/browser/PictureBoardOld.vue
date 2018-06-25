<template>
  <div>
    <masonry class="results" :cols="columns" :gutter="gutter" :style="{ padding: spaceAround + 'px' }" v-resize.quiet="onResize"
      v-scroll="onScroll">
      <v-card class="result-card" v-for="(item, index) in pictures" :key="getUID()" :style="{ marginBottom: spaceBelow + 'px' }"
        v-if="index < amountDisplayed">
        <v-card-media class="result-card-media" :src="item.tu" :height="item.th + (viewportWidth / 8)">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 v-if="item.pt" class="title mb-0">{{ item.pt }}</h3>
            <p v-if="item.s" class="body-1">{{ item.s }}</p>
            <p class="caption grey--text">Width: {{ item.ow }}, Height: {{ item.oh}}</p>
            <p v-if="item.st" class="caption grey--text">Source: {{ item.st }}</p>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn icon @click.native="toggleFav(item)" :class="{'fav-active': isFav(item.ou)}">
            <v-icon>favorite</v-icon>
          </v-btn>
          <v-btn icon @click.native.stop="share(item.ou)">
            <v-icon>share</v-icon>
          </v-btn>
          <v-btn icon :href="item.ou" target="_blank">
            <v-icon>get_app</v-icon>
          </v-btn>
          <v-btn icon :href="item.ru" target="_blank">
            <v-icon>open_in_new</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="item.rimg" @click.native="explore(item.rimg)" color="accent" flat>
            Explore
            <v-icon right>image_search</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </masonry>
  </div>
</template>

<script>
  // TODO: Save scroll position for navigating back and forth to results page, currently scrolls to top when navigating back to this page
  // TODO: Remove explore button from first image on pages that were generated via related images link
  // TODO: Download image for cordova. currently opens window in browser
  // TODO: Swipable image gallery when clicking on image thumbnail

  export default {
    props: {
      pictures: {
        type: Array,
        required: true
      },
      refreshOnchange: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        columns: {
          default: 4,
          1300: 3,
          920: 2,
          720: 1
        },
        gutter: {
          default: 25,
          1300: 20,
          920: 16,
          720: 10
        },
        viewportWidth: 0,
        amountDisplayed: 12
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
      toggleFav (data) {
        this.$store.dispatch('toggleFav', data)
      },
      getGutter (modifier) {
        let vpw = this.viewportWidth
        let gutter = this.gutter.default
        if (vpw >= 1300) {
          gutter = this.gutter['1300']
        } else if (vpw >= 920) {
          gutter = this.gutter['920']
        } else {
          gutter = this.gutter['720']
        }
        if (modifier) {
          gutter += modifier
        }
        return gutter
      },
      contentHeight () {
        return (
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight
        )
      },
      onResize () {
        this.viewportWidth = window.innerWidth
      },
      onScroll () {
        if (window.scrollY >= this.contentHeight() - this.viewportWidth) {
          if (this.amountDisplayed < this.pictures.length) {
            this.amountDisplayed += 8
          }
        }
      },
      getUID () {
        return window.btoa(Math.floor(Math.random() * (100 ** 8))).replace(/=/gm, '')
      }
    },
    computed: {
      spaceAround () {
        return this.getGutter(7)
      },
      spaceBelow () {
        return this.getGutter(12)
      }
    },
    watch: {
      pictures () {
        if (this.refreshOnchange) {
          window.scrollTo({ top: 0, behavior: 'instant' })
          this.amountDisplayed = 12
        }
      }
    },
    mounted () {
      this.viewportWidth = window.innerWidth
    }
  }
</script>

<style scoped>
  .title,
  .body-1 {
    word-break: break-all !important;
  }

  .body-1 {
    margin-top: 14px !important;
  }
</style>
<template>
  <div>
    <masonry :cols="columns" :gutter="gutter" :style="{ padding: margins }" v-scroll="onScroll" v-resize="onResize">
      <app-picture-tile
      v-for="(item, index) in pictures" 
      :key="getUID()" 
      :item="item"
      :hover="hover"
      :showBottom="showBottom"
      :style="{ marginBottom: contentBuffer }"
      >
      </app-picture-tile>
    </masonry>
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
      }
    },
    data () {
      return {
        list: []
      }
    },
    methods: {
      lazyScroll ($state) {
        setTimeout(() => {
          let start = this.list.length
          let end = this.list.length + 20
          let temp = this.pictures.slice(start, end)
          this.list = this.list.concat(temp)
          $state.loaded()
        }, 1000)
      },
      getUID () {
        return window.btoa(Math.floor(Math.random() * (100 ** 8))).replace(/=/gm, '')
      },
      onScroll () {
        this.$store.dispatch('onScroll', {
          y: window.scrollY,
          cH: document.documentElement.clientHeight,
          sH: document.documentElement.scrollHeight
        })
      },
      onResize () {
        this.$store.dispatch('onResize', window.innerWidth)
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
      this.$store.dispatch('onResize', window.innerWidth)
    }
  }
</script>
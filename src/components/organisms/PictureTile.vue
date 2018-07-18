<template>
    <v-card v-if="initialized" raised hover class="picture-tile animated fadeIn">
        <app-picture-tile-top
          :item="item"
          :hover="hover"
          :hAdjust="hAdjust"
          :fav="isFav"
          :showExplore="showExplore"
          @explore="explore"
          @toggleFav="toggleFav"
          ></app-picture-tile-top>
          <app-picture-tile-bottom 
          :item="item"
          :fav="isFav"
          :showExplore="showExplore"
          v-if="showBottom"
          @share="share"
          @explore="explore"
          @toggleFav="toggleFav"
        >
        </app-picture-tile-bottom>
      </v-card>
</template>
<script>
  import PictureTileTop from '../molecules/PictureTileTop'
  import PictureTileBottom from '../molecules/PictureTileBottom'

  export default {
    components: {
      'app-picture-tile-top': PictureTileTop,
      'app-picture-tile-bottom': PictureTileBottom
    },
    props: {
      item: {
        type: Object,
        required: true
      },
      showBottom: {
        type: Boolean,
        default: false
      },
      hover: {
        type: Boolean,
        default: true
      },
      hAdjust: {
        type: Number,
        default: 10
      },
      index: {
        type: Number,
        default: 0
      },
      incrementor: {
        type: Number,
        default: 0
      },
      columns: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        initialized: false
      }
    },
    computed: {
      isFav () {
        return this.$store.getters.isFav(this.item.ou) !== -1
      },
      showExplore () {
        return this.item.rimg !== false
      }
    },
    methods: {
      share () {
        this.$store.dispatch('shareDialogOpen', this.item.ou)
      },
      toggleFav () {
        this.$store.dispatch('toggleFav', this.item)
      },
      explore (payload) {
        this.$store.dispatch('generateNew', {
          option: payload.option,
          [payload.type]: payload.criteria,
          keywords: this.item.okeys,
          categories: this.item.ocats
        })
      }
    },
    mounted () {
      let index = this.index
      let modulo = index % this.incrementor
      let vpw = window.innerWidth
      let columns = 1
      for (let col in this.columns) {
        if (vpw > col) {
          columns = this.columns[col] + 1
        }
      }
      if (modulo > modulo / columns) {
        modulo = modulo / columns
      }
      let delayOffset = modulo * 85
      setTimeout(() => {
        this.initialized = true
      }, delayOffset)
    },
  }
</script>
<style scoped>
  .picture-tile {
    border-radius: 10px
  }
</style>
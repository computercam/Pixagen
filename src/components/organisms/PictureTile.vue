<template>
    <v-card raised hover class="picture-tile">
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
      showExplore: {
        type: Boolean,
        default: true
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
    computed: {
      isFav () {
        return this.$store.getters.isFav(this.item.ou) !== -1
      }
    }
  }
</script>
<style scoped>
  .picture-tile {
    border-radius: 10px
  }
</style>
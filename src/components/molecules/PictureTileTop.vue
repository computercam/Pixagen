<template>
  <div>
    <v-container fluid class="picture-tile-media" @mouseenter="imageHover($event)" @mouseleave="imageLeave($event)">
      <div v-if="hover" class="picture-tile-actions animated fadeIn">
        <v-layout class="fill-height" row wrap align-content-space-between>
          <v-flex xs12>
            <v-btn v-show="showExplore" depressed round color="primary" class="btn-explore"  @click.native="explore({ type: 'rimg', option: 3, criteria: item.rimg })" >
              <v-icon small left>image_search</v-icon>
              Explore
            </v-btn>
          </v-flex>
          <v-flex xs12>
            <v-btn depressed icon large class="btn-favorite" @click.native.stop.prevent="toggleFav()">
              <v-icon :class="{ liked: fav }" color="white">favorite</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <div class="picture-tile-actions overlay swiper-target">
        </div>
      </div>
      <app-picture :source="item.tu" :h="item.th" :hAdjust="hAdjust" class="picture-tile-picture"></app-picture>
      <v-progress-circular indeterminate color="secondary" class="picture-tile-loading"></v-progress-circular>
    </v-container>
  </div>
</template>
<script>
  import Picture from '../atoms/Picture'

  export default {
    components: {
      'app-picture': Picture
    },
    props: {
      item: {
        type: Object,
        required: true
      },
      hover: {
        type: Boolean,
        default: true
      },
      hAdjust: {
        type: Number,
        default: 10
      },
      fav: {
        type: Boolean,
        default: false
      },
      showExplore: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      toggleFav () {
        this.$emit('toggleFav', null)
      },
      explore (payload) {
        this.$emit('explore', payload)
      },
      imageHover (event) {
        if (this.hover) {
          let el = event.target.children
          el[0].style.display = 'block'
          el[1].style.filter = 'saturate(90%) contrast(90%)'
        }
      },
      imageLeave (event) {
        if (this.hover) {
          let el = event.target.children
          el[0].style.display = 'none'
          el[1].style.filter = 'saturate(100%) contrast(100%)'
        }
      }
    }
  }
</script>
<style scoped>
  .overlay {
    border-radius: 10px;
    background: linear-gradient(-180deg, rgba(108, 105, 116, 0.3), rgba(108, 105, 116, 0.7), black) !important;
    opacity: 0.5;
    display: block !important;
  }
  
  .picture-tile-media {
    border-radius: 10px;
    padding: 0px;
    position: relative;
  }
  
  .picture-tile-actions {
    border-radius: 10px;
    position: absolute;
    display: none;
    z-index: 12;
    height: 100%;
    width: 100%;
    top: 0;
  }

  .picture-tile-picture {
    z-index: 11;
    position: relative;
  }

  .picture-tile-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
  
  .btn-explore {
    float:right; 
    margin: 14px; 
    z-index: 20; 
  }
  
  .btn-favorite {
    z-index: 20
  }

  .liked {
    color: #26c6da !important;
  }
</style>
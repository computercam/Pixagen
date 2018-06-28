<template>
  <div>
    <v-container fluid class="picture-tile-media" @mouseenter="imageHover($event)" @mouseleave="imageLeave($event)">
      <div v-if="hover" class="picture-tile-actions animated fadeIn">
        <v-layout class="fill-height" row wrap align-content-space-between>
          <v-flex xs12>
            <v-btn depressed round color="primary" class="btn-explore" v-if="item.rimg" @click.native="explore()" >
              <v-icon small left>image_search</v-icon>
              Explore
            </v-btn>
          </v-flex>
          <v-flex xs12>
            <v-btn depressed icon large class="btn-favorite" @click.native="toggleFav()">
              <v-icon :class="{ liked: fav }" color="white">favorite</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <div class="picture-tile-actions overlay">
        </div>
      </div>
      <app-picture :source="item.tu" :h="item.th" :hAdjust="hAdjust"></app-picture>
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
      }
    },
    methods: {
      toggleFav () {
        this.$emit('toggleFav', null)
      },
      explore () {
        this.$emit('explore', null)
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
    z-index: 10;
    height: 100%;
    width: 100%;
  }
  
  .btn-explore {
    float:right; 
    margin: 10px; 
    z-index: 11; 
  }
  
  .btn-favorite {
    z-index: 11
  }

  .liked {
    color: #26c6da !important;
  }

  .fadeIn { 
    -webkit-animation: fadeIn 800ms; /* Safari 4+ */ 
    -moz-animation:    fadeIn 800ms; /* Fx 5+ */ 
    -o-animation:      fadeIn 800ms; /* Opera 12+ */ 
    animation:         fadeIn 800ms; /* IE 10+, Fx 29+ */ 
  }
</style>
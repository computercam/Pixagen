<template>
    <div class="picture" :style="{ height: getImageHeight() + 'px', backgroundImage: 'url(' + source + ')' }"></div>
</template>
<script>
  export default {
    props: {
      source: {
        type: String,
        required: true
      },
      h: {
        type: Number,
        required: true
      },
      hAdjust: {
        type: Number,
        default: 10
      }
    },
    methods: {
      getImageHeight () {
        return this.h + (window.innerWidth / this.hAdjust)
      }
    }
  }
</script>
<style scoped>
  .picture {
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    width: 100%;
  }

  /* .picture[lazy=loading] {
    background: linear-gradient(135deg, #6beeff, #7b7292, #b68eff) !important;
    background-size: 300% 300% !important;
    animation: Gradient 2s ease infinite !important;
    transition: all 750ms !important;
    opacity: 0.5 !important;
  } */

  /* @keyframes Gradient {
    0% {
      background-position: 0% 50%
    }
    50% {
      background-position: 100% 50%
    }
    100% {
      background-position: 0% 50%
    }
  } */
</style>
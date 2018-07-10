<template>
  <div v-if="overlayStatus">
    <div class="overlay-container">
      <v-container class="fill-height overlay-content" fluid>
        <v-layout column align-center justify-center>
          <v-flex xs4>
            <v-progress-circular v-if="overlayData.loading" :size="150" :width="10" indeterminate color="primary"></v-progress-circular>
            <v-icon color="error" v-if="!overlayData.loading" class="overlay-icon">{{ overlayData.icon }}</v-icon>
          </v-flex>
          <v-flex xs1>
            <div v-if="showMessage" class="animated bounceIn">
              <div class="headline hover font-weight-medium">{{ overlayData.message }}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div class="overlay-background"></div>
  </div>
</template>

<script>
  export default {
    name: 'InfoOverlay',
    data () {
      return {
        showMessage: false
      }
    },
    computed: {
      overlayData () {
        return this.$store.getters.overlayData
      },
      overlayStatus () {
        return this.$store.getters.overlayStatus
      }
    },
    watch: {
      overlayStatus () {
        this.showMessage = false
        this.showMessage = true
      }
    },
    mounted () {
      this.showMessage = true
    }
  }
</script>

<style scoped>
  .overlay-background, 
  .overlay-container {
    height: 100vh;
    width: 100vw;
    position: fixed;
  }
  .overlay-container {
    z-index: 200;
  }
  .overlay-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .overlay-background {
    z-index: 199;
    background: rgba(209, 203, 224, 0.8);
    mix-blend-mode: hard-light;
  }
  .overlay-icon {
    font-size: 180px;
  }
  .headline {
    color: #7b7594;
    text-shadow: 3px 3px 20px rgba(255, 255, 255, 0.6);
  }
  .hover {
    animation: hover 1s linear infinite;
  }
  @keyframes hover {
      0% {
        margin-top: -5px;
      }
      50% {
        margin-top: 5px;
      }
      100% {
        margin-top: -5px;
      }
    }
</style>

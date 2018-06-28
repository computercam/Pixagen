<template>
  <div v-if="overlayStatus" class="overlay-container">
    <v-container class="fill-height" fluid>
      <v-layout column align-center justify-center>
        <v-flex xs4>
          <v-progress-circular v-if="overlayData.loading" :size="150" :width="10" indeterminate color="primary"></v-progress-circular>
          <v-icon v-if="!overlayData.loading" class="overlay-icon">{{ overlayData.icon }}</v-icon>
        </v-flex>
        <v-flex xs1>
          <div class="caption">{{ overlayData.message }}</div></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'InfoOverlay',
  computed: {
    overlayData () {
      return this.$store.getters.overlayData
    },
    overlayStatus () {
      return this.$store.getters.overlayStatus
    }
  }
}
</script>

<style scoped>
.overlay-container {
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  background: rgba(82, 79, 91, 0.8);
}
.overlay-icon {
  font-size: 180px;
}
.caption {
  color: white;
}
</style>

<template>
  <div class="svg-bg-container">
    <div class="logo-faded"></div>
  </div>
</template>
<script>
  export default {
    name: 'BlankPage'
  }
</script>
<style scoped>
  .svg-bg-container {
    height: 80vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo-faded {
    height: 60%;
    width: 60%;
    background-image: url(../assets/logo/faded.svg), none;
    background-position: center;
    background-size: contain;
    opacity: 0.5;
  }
</style>
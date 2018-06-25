<template>
  <div>
    <router-view :style="{
      marginTop: spaceTop + 'px',
    }"></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
      spaceTop: 48
    }
  },
  mounted () {
    this.spaceTop = document.querySelector('.toolbar__content').clientHeight
  }
}
</script>
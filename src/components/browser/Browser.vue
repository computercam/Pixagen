<template>
	<div>
		<app-navbar class="navBar"></app-navbar>
		  <router-view class="content-view"
				:style="{
				marginTop: spaceTop + 'px',
				paddingBottom: spaceBottom + 'px'
        }"
      ></router-view>
		<app-actionbar class="actionBar"></app-actionbar>
	</div>
</template>
<script>
import Navbar from './Navbar'
import Actionbar from './Actionbar'

export default {
  data () {
    return {
      spaceTop: 56,
      spaceBottom: 56
    }
  },
  components: {
    'app-navbar': Navbar,
    'app-actionbar': Actionbar
  },
  computed: {
    navShow () {
      return this.$store.getters.getNavShow
    }
  },
  watch: {
    navShow () {
      let top = document.querySelector('.navBar nav')
      let bottom = document.querySelector('.actionBar')
      if (this.navShow === false) {
        top.style.transform = 'translateY(' + this.spaceTop * -1 + 'px)'
        bottom.style.transform = 'translateY(' + this.spaceBottom + 'px)'
      } else {
        top.style.transform = 'translateY(' + 0 + 'px)'
        bottom.style.transform = 'translateY(' + 0 + 'px)'
      }
    }
  }
}
</script>
<style scoped>
  .navBar nav,
  .actionBar {
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
</style>

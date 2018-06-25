<template>
    <div>
      <app-picboard v-if="exists" :pictures="current.metadata" 
      :info="{ keywords: current.keywords, categories: current.categories }" :titlesShow="true" :generateMoreShow="true">
    </app-picboard>
      <app-blank v-else></app-blank>
    </div>
</template>
<script>
import PictureBoard from './PictureBoard'
import BlankPage from '../BlankPage'
import dummy from '../../assets/dummy/dummy.json'

export default {
  components: {
    'app-picboard': PictureBoard,
    'app-blank': BlankPage
  },
  computed: {
    dummyData () {
      return {
        pictures: dummy,
        keywords: ['Saku+hanga', 'Shades'],
        categories: ['Lol', 'Swag'],
        exists: true
      }
    },
    current () {
      return this.$store.getters.historyCurrent
    },
    exists () {
      return this.$store.getters.historyExists
    }
  },
  watch: {
    current () {
      this.$store.dispatch('setNavShow', true)
    }
  },
  mounted () {
    console.log(this.current)
    this.$store.dispatch('setActionbarSelected', 'browse')
  }
}
</script>
<style>
</style>

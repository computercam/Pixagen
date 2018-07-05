<template>
  <div>
    <template v-if="exists">
      <v-list two-line subheader>
        <v-subheader class="light-text">SEARCH HISTORY</v-subheader>
        <v-divider></v-divider>
        <v-list-tile v-for="(item, index) in history" :key="index">
          <v-badge left color="secondary" overlap :value="isRimg(item.rimg)">
            <v-icon slot="badge" small>image_search</v-icon>
            <v-list-tile-avatar>
              <div class="history-image" :style="{ backgroundImage: 'url(' + item.metadata[0].tu +')' }"></div>
            </v-list-tile-avatar>
          </v-badge>
          <v-list-tile-content>
            <v-list-tile-title class="dark-text">{{ getWords(item.keywords) }}</v-list-tile-title>
            <v-list-tile-sub-title class="light-text">{{ getWords(item.categories) }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action @click="timeTravel(index)">
            <v-list-tile-action-text>
              <v-icon color="primary">
                play_arrow
              </v-icon>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </template>
    <app-blank v-else></app-blank>
  </div>
</template>

<script>
  import Blank from '../../atoms/Blank'
  export default {
    components: {
      'app-blank': Blank
    },
    methods: {
      getWords (wordlist) {
        let str = ''
        wordlist.forEach((item, index, array) => {
          str += item.charAt(0).toUpperCase() + item.slice(1).replace(/[\+-_]+/gm, ' ')
          if (index < array.length - 1) str += ', '
        })
        return str.trim()
      },
      isRimg (rimg) {
        if (rimg !== false) {
          return true
        } else {
          return rimg
        }
      },
      timeTravel (index) {
        this.$store.dispatch('historyTimetravel', index)
      }
    },
    computed: {
      history () {
        return this.$store.getters.historyAll
      },
      exists () {
        return this.$store.getters.historyExists
      }
    },
    mounted () {
      this.$store.dispatch('setNavShow', true)
      this.$store.dispatch('setActionbarSelected', 'history')
    }
  }
</script>

<style scoped>
  .history-image {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: 50% 50%;
    border-radius: 100%;
  }
</style>
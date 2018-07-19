<template>
  <div>
    <v-list-tile v-if="initialized.main" class="history-tile animated fadeIn" :key="index">
      <v-badge v-if="initialized.avatar" left color="secondary" overlap :value="item.rimg !== false">
        <v-icon slot="badge" small>image_search</v-icon>
        <v-list-tile-avatar>
          <div class="history-image" :style="{ backgroundImage: 'url(' + item.metadata[0].tu +')' }"></div>
        </v-list-tile-avatar>
      </v-badge>
      <v-list-tile-avatar v-else color="white">
        <div class="history-image" :style="{ backgroundImage: 'url(' + item.metadata[0].tu +')' }"></div>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title class="dark-text">{{ getWords(item.keywords) }}</v-list-tile-title>
        <v-list-tile-sub-title class="history-subtitle light-text" v-html="getSubtitle(item)"></v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action @click="timeTravel(index)">
        <v-list-tile-action-text>
          <v-icon color="primary">
            play_arrow
          </v-icon>
        </v-list-tile-action-text>
      </v-list-tile-action>
    </v-list-tile>
    <v-divider inset v-if="showDivider && initialized.divider" class="animate fadeIn"></v-divider>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    props: {
      item: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      showDivider: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        initialized: {
          main: false,
          avatar: false,
          divider: false
        }
      }
    },
    methods: {
      getWords(wordlist) {
        let str = ''
        wordlist.forEach((item, index, array) => {
          str += item.charAt(0).toUpperCase() + item.slice(1).replace(/[\+-_]+/gm, ' ')
          if (index < array.length - 1) str += ', '
        })
        return str.trim()
      },
      getSubtitle(item) {
        let categories = this.getWords(item.categories)
        let time = moment(item.time).fromNow()
        categories = `<span class="categories">${categories}</span>`
        time = `<span class="time">${time}</span>`
        return categories + time
      },
      timeTravel(index) {
        this.$store.dispatch('historyTimetravel', index)
      }
    },
    mounted() {
      this.$store.dispatch('setNavShow', true)
      this.$store.dispatch('setActionbarSelected', 'history')
      setTimeout(() => {
        this.initialized.main = true
        setTimeout(() => {
          this.initialized.divider = true
        }, 25)
        setTimeout(() => {
          this.initialized.avatar = true
        }, 25)
      }, 175)
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

  .history-tile {
    padding: 15px 0;
  }

  .history-subtitle {
    display: flex;
    flex-direction: column;
  }
</style>
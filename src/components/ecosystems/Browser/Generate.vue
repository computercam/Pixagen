<template>
  <div>
    <v-list two-line subheader>
      <v-subheader class="light-text">GENERATE OPTIONS</v-subheader>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title class="darker-text">
            Random Keywords
          </v-list-tile-title>
          <v-list-tile-sub-title class="light-text">
            Use random categories
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action @click="generate(0)">
          <v-list-tile-action-text>
            <v-icon color="primary">
              play_arrow
            </v-icon>
          </v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
      <template v-if="exists">
        <v-divider inset></v-divider>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title class="darker-text">
              Same Categories
            </v-list-tile-title>
            <v-list-tile-sub-title class="light-text">
              Recycle the current categories
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action @click="generate(1)">
            <v-list-tile-action-text>
              <v-icon color="primary">
                play_arrow
              </v-icon>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider inset></v-divider>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title class="darker-text">
              Keep Keywords
            </v-list-tile-title>
            <v-list-tile-sub-title class="light-text">
              Recycle the current keywords
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action @click="generateKeep()">
            <v-list-tile-action-text>
              <v-icon color="primary">
                play_arrow
              </v-icon>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-for="(word, index) in keywords" :key="word">
          <v-list-tile-content>
            <v-list-tile-title class="dark-text">
              {{ formatKeywords(word) }}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>
              <v-checkbox color="primary" v-model="keep" :value="index"></v-checkbox>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
    <v-list two-line subheader>
      <v-divider></v-divider>
      <v-subheader class="light-text">ADVANCED</v-subheader>
      <v-divider></v-divider>
      <v-list-tile @click="nav('s0')">
        <v-list-tile-content>
          <v-list-tile-title class="darker-text">Generate Settings</v-list-tile-title>
          <v-list-tile-sub-title class="light-text">More generation options</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>
            <v-icon color="primary">
              keyboard_arrow_right
            </v-icon>
          </v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
  import { routerHelpers } from '../../../router/routerHelpers.js'
  // TODO: Show the current categories near or when hovering same categories, currently the user has no way to know what categories were used.
  export default {
    mixins: [routerHelpers],
    data() {
      return {
        keep: [0]
      }
    },
    methods: {
      formatKeywords(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/\+/gm, ' ')
      },
      generate(num) {
        this.$store.dispatch('generateNew', { option: num })
      },
      generateKeep() {
        this.$store.dispatch('validateKeep', this.keep)
      }
    },
    computed: {
      current() {
        return this.$store.getters.historyCurrent
      },
      exists() {
        return this.$store.getters.historyExists
      },
      keywords() {
        return this.current.keywords
      }
    },
    mounted() {
      this.$store.dispatch('setNavShow', true)
      this.$store.dispatch('setActionbarSelected', 'generate')
    }
  }
</script>

<style scoped>
  .kw-counter {
    width: 24px;
    text-align: center;
  }
</style>
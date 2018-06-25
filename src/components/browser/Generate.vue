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
      </template>
    </v-list>
    <v-list v-if="exists">
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
    </v-list>
    <v-list two-line subheader>
      <v-divider></v-divider>
      <v-subheader class="light-text">KEYWORD OPTIONS</v-subheader>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title class="darker-text">Keywords</v-list-tile-title>
          <v-list-tile-sub-title class="light-text">Amount of keywords to generate</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <div class="kw-counter darker-text">{{ keywordAmount }}</div>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile>
        <v-flex xs12>
          <v-slider min="0" ticks color="primary" :max="settings.keywords.max" v-model="keywordAmount"></v-slider>
        </v-flex>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title class="darker-text">Single Only</v-list-tile-title>
          <v-list-tile-sub-title class="light-text">All keywords forced to one word</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>
            <v-checkbox color="primary" v-model="single"></v-checkbox>
          </v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title class="darker-text">Safe Search</v-list-tile-title>
          <v-list-tile-sub-title class="light-text">Filter results for adult content</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>
            <v-checkbox color="primary" v-model="safeMode"></v-checkbox>
          </v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile @click="nav('s1')">
        <v-list-tile-content>
          <v-list-tile-title class="darker-text">Blacklist</v-list-tile-title>
          <v-list-tile-sub-title class="light-text">Filter results for specific words</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>
            <v-icon color="primary">
              keyboard_arrow_right
            </v-icon>
          </v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
      <!-- <v-divider inset></v-divider>
        <v-list-tile @click="nav('s2')">
          <v-list-tile-content>
            <v-list-tile-title>Translate</v-list-tile-title>
            <v-list-tile-sub-title>Translate language of the keywords</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>
              <v-icon color="primary">
                keyboard_arrow_right
              </v-icon>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile> -->
        <v-divider></v-divider>
        <v-subheader class="light-text">CATEGORY OPTIONS</v-subheader>
        <v-divider></v-divider>
        <v-list-tile @click="nav('s3')">
          <v-list-tile-content>
            <v-list-tile-title class="darker-text">Categories</v-list-tile-title>
            <v-list-tile-sub-title class="light-text">Toggle categories used for searching</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>
              <v-icon color="primary">
                keyboard_arrow_right
              </v-icon>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider inset></v-divider>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title class="darker-text">Unique Categories</v-list-tile-title>
            <v-list-tile-sub-title class="light-text">Disable duplicate categories usage</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>
              <v-checkbox color="primary" v-model="unique"></v-checkbox>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </div>
  </template>
  
  <script>
    import { routerHelpers } from '../../router/routerHelpers.js'
    // TODO: Show the current categories near or when hovering same categories, currently the user has no way to know what categories were used.
    export default {
      mixins: [routerHelpers],
      data () {
        return {
          keep: [0]
        }
      },
      methods: {
        formatKeywords (str) {
          return str.charAt(0).toUpperCase() + str.slice(1).replace(/\+/gm, ' ')
        },
        generate (num) {
          this.$store.dispatch('generateNew', { option: num })
        },
        generateKeep () {
          this.$store.dispatch('validateKeep', this.keep)
        }
      },
      computed: {
        current () {
          return this.$store.getters.historyCurrent
        },
        exists () {
          return this.$store.getters.historyExists
        },
        keywords () {
          return this.current.keywords
        },
        keywordsMax () {
          return this.$store.getters.getSettings.keywords.amount
        },
        settings () {
          return this.$store.getters.getSettings
        },
        safeMode: {
          get () {
            return this.settings.keywords.safeMode
          },
          set () {
            this.$store.dispatch('toggleSafemode')
          }
        },
        keywordAmount: {
          get () {
            return this.settings.keywords.amount
          },
          set (payload) {
            this.$store.dispatch('setKeywordAmount', payload)
          }
        },
        single: {
          get () {
            return this.settings.keywords.single
          },
          set () {
            this.$store.dispatch('toggleSingle')
          }
        },
        unique: {
          get () {
            return this.settings.categories.unique
          },
          set () {
            this.$store.dispatch('toggleUnique')
          }
        }
      },
      mounted () {
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
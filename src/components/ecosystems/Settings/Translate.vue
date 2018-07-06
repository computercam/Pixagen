<template>
  <div>
    <v-list two-line>
      <v-subheader>TRANSLATION OPTIONS</v-subheader>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            Activate
          </v-list-tile-title>
          <v-list-tile-sub-title>
            Enable keyword translation
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>
            <v-checkbox v-model="translate"></v-checkbox>
          </v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile>
        <v-flex xs7>
          Language
        </v-flex>
        <v-flex xs5>
          <v-select :items="languages" v-model="language">
          </v-select>
        </v-flex>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      language: null
    }
  },
  computed: {
    languages () {
      return this.$store.getters.getSettings.keywords.translate.languages
    },
    translate: {
      get () {
        return this.$store.getters.getSettings.keywords.translate.active
      },
      set () {
        this.$store.dispatch('toggleTranslationActive')
      }
    }
  },
  watch: {
    language () {
      this.$store.dispatch('setTranslationLanguage', this.language)
    }
  },
  mounted () {
    this.$store.dispatch('setSettingsNav', { title: 'Translate' })
  }
}
</script>

<style scoped>
</style>

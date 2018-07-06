<template>
  <div>
    <v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-layout row>
            <v-flex xs12>
              <p class="darker-text">Enter a comma separated list of words to omit from the image search criteria.</p>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="input-1"
                label="Blacklisted Words"
                v-model.lazy.trim="blacklist"
                textarea
                auto-grow
                rows="10"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    blacklist: {
      get () {
        return this.$store.getters.getSettings.keywords.blacklist.toString()
      },
      set (payload) {
        this.$store.dispatch('setBlacklist', payload)
      }
    }
  },
  mounted () {
    this.$store.dispatch('setSettingsNav', { title: 'Blacklist' })
  }
}
</script>

<style scoped>
</style>

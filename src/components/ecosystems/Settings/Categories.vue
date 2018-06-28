<template>
  <div>
    <v-subheader class="light-text">ACTIVE</v-subheader>
    <v-divider></v-divider>
    <v-card>
      <v-card-text>
        <v-chip v-for="(item, index) in active" :key="item + index" @mouseup="removeCategory(item)">{{ formatCategories(item) }}
          <v-icon right color="error darken-3">
            remove_circle
          </v-icon>
        </v-chip>
      </v-card-text>
      <template v-if="excluded.length > 0">
        <v-subheader class="light-text">EXCLUDED</v-subheader>
        <v-divider></v-divider>
        <v-card-text>
          <v-chip v-for="(item, index) in excluded" :key="item + index" @mouseup="addCategory(item)">{{ formatCategories(item) }}
            <v-icon right color="success darken-3">
              check_circle
            </v-icon>
          </v-chip>
        </v-card-text>
      </template>
    </v-card>
  </div>
</template>

<script>
  import Navbar from '../../organisms//Navbar'
  
  export default {
    components: {
      'app-navbar': Navbar
    },
    methods: {
      addCategory (category) {
        this.$store.dispatch('addActiveCategory', category)
      },
      removeCategory (category) {
        this.$store.dispatch('removeActiveCategory', category)
      },
      formatCategories (item) {
        return item.charAt(0).toUpperCase() + item.slice(1).replace(/_/gm, ' ')
      }
    },
    computed: {
      active () {
        return this.$store.getters.getSettings.categories.active.sort()
      },
      excluded () {
        return this.$store.getters.getSettings.categories.excluded.sort()
      }
    },
    mounted () {
      this.$store.dispatch('setSettingsNav', { title: 'Categories', back: 's0' })
    }
  }
</script>

<style scoped>
</style>

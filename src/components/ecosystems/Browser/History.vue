<template>
  <div>
    <div v-if="exists">
      <div class="animated fadeIn">
        <v-list two-line subheader>
          <v-subheader class="light-text">SEARCH HISTORY</v-subheader>
          <v-divider></v-divider>
          <template v-for="(item, index) in history">
            <app-history-tile :item="item" :index="index" :showDivider="index < history.length - 1"></app-history-tile>
          </template>
        </v-list>
      </div>
    </div>
    <app-blank v-else></app-blank>
  </div>
</template>

<script>
  import Blank from '../../atoms/Blank'
  import historyListTile from '../../molecules/historyListTile'
  export default {
    components: {
      'app-blank': Blank,
      'app-history-tile': historyListTile
    },
    computed: {
      history() {
        return this.$store.getters.historyAll
      },
      exists() {
        return this.$store.getters.historyExists
      }
    },
  }
</script>
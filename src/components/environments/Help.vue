<template>
  <div>
    <app-navbar :title="'Help'" color="primary" :logo="false" :menu="false"></app-navbar>
    <v-container class="help-container">
      <v-expansion-panel popout class="faq-section">
        <v-expansion-panel-content v-for="(item, index) in faq" :key="index">
          <div class="title font-weight-regular" slot="header">{{ item.title }}</div>
          <v-card>
            <v-card-text v-for="(item, index) in item.paragraphs" :key="index">{{ item }}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-layout column justify-start align-center>
        <a href="https://www.youtube.com" target="_blank">
          <v-btn depressed large round color="primary"><v-icon left>ondemand_video</v-icon>Watch tutorial</v-btn>
        </a>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import Navbar from '../organisms/Navbar'

  export default {
    components: {
      'app-navbar': Navbar
    },
    computed: {
      faq () {
        return this.$store.getters.getFaq
      }
    }
  }
</script>
<style scoped>
  .help-container {
    margin-top: 48px;
  }
  .faq-section {
    margin-bottom: 40px;
  }
</style>
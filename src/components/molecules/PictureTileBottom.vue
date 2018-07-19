<template>
  <div>
    <v-card-title primary-title>
      <div>
        <h3 v-if="item.pt" class="dark-text title mb-0">{{ item.pt }}</h3>
        <p v-if="item.s" class="dark-text body-1">{{ item.s }}</p>
        <p class="light-text caption grey--text">Width: {{ item.ow }}, Height: {{ item.oh}}</p>
        <p v-if="item.st" class="light-text caption grey--text">Source: {{ item.st }}</p>
      </div>
    </v-card-title>
    <div class="bottom-actions">
      <v-card-actions v-if="initialized" class="animated fadeIn">
        <v-btn class="btn-favorite" @click.native="toggleFav()" icon>
          <v-icon :class="{ liked: fav, 'dark-text': true }">favorite</v-icon>
        </v-btn>
        <v-btn icon @click.native.stop="share()">
          <v-icon class="dark-text">share</v-icon>
        </v-btn>
        <v-btn icon :href="item.ou" target="_blank">
          <v-icon class="dark-text">get_app</v-icon>
        </v-btn>
        <v-btn icon :href="item.ru" target="_blank">
          <v-icon class="dark-text">open_in_new</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-show="showExplore" depressed round color="primary" class="btn-explore"  @click.native="explore({ type: 'rimg', option: 3, criteria: item.rimg })" >
          <v-icon small left>image_search</v-icon>
          Explore
        </v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      },
      fav: {
        type: Boolean,
        default: false
      },
      showExplore: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        initialized: false
      }
    },
    methods: {
      share () {
        this.$emit('share', null)
      },
      toggleFav () {
        this.$emit('toggleFav', null)
      },
      explore (payload) {
        this.$emit('explore', payload)
      }
    },
    mounted () {
      setTimeout(() => {
        this.initialized = true
      }, 250)
    }
  }
</script>
<style scoped>
  .title {
    margin-bottom: 14px !important;
  }
  .title,
  .body-1 {
    word-break: break-word !important;
  }
  .liked {
    color: #26c6da !important;
  }
  .btn-explore {
    margin: 8px;
  }
  .bottom-actions {
    height: 68px;
  }
</style>
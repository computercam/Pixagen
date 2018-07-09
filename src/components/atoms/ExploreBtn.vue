<template>
  <div>
    <v-btn v-if="item.rimg" depressed round color="primary" class="btn-explore"  @click.native="explore({ type: 'rimg', option: 3, criteria: item.rimg })" >
      <v-icon small left>image_search</v-icon>
      Explore
    </v-btn>
    <!-- <v-btn v-else depressed round color="white" class="invert-text btn-explore" @click.native="explore({ type: 'sbi', option: 4, criteria: item.ou })" >
      <v-icon class="invert-text" small left>image_search</v-icon>
      Explore
    </v-btn> -->
  </div>
</template>
<script>
  // TODO: Search by image feature needs refinement before it can be properly implemented
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods: {
      explore (payload) {
        this.$emit('explore', payload)
      }
    }
  }
</script>
<style scoped>
  .invert-text {
    color: #7b7594
  }
  .btn-explore {
    z-index: 21;
  }
</style>
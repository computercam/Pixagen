<template>
    <div>
        <v-snackbar
        :timeout="snackbar.timeout"
        :color="snackbar.color"
        :top="snackbar.y === 'top'"
        :bottom="snackbar.y === 'bottom'"
        :right="snackbar.x === 'right'"
        :left="snackbar.x === 'left'"
        :multi-line="snackbar.mode === 'multi'"
        :vertical="snackbar.mode === 'vert'"
        v-model="snackbar.active"
      >
        {{ snackbar.message }}
        <v-btn flat @click.native="closeSnackbar()">Close</v-btn>
      </v-snackbar>
    </div>
</template>
<script>
  export default {
    name: 'InfoSnackbar',
    methods: {
      closeSnackbar () {
        this.$store.dispatch('setSnackbar', { active: false })
      }
    },
    computed: {
      snackbar () {
        return this.$store.getters.getSnackbar
      }
    }
  }
</script>
<style scoped>

</style>
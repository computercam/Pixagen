export const routerHelpers = {
  methods: {
    nav (route, query) {
      this.$router.push({ name: route, query: query })
    }
  }
}

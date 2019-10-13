<template>
  <v-bottom-navigation fixed color="red darken-3">
    <v-btn value="recipes" to="/">
      <span>Recipes</span>
      <v-icon>mdi-view-list</v-icon>
    </v-btn>
    <v-btn value="create" to="/create">
      <span>New</span>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
    export default {
        name: "BottomNavigation"
    }
</script>

<style scoped>
  .v-btn {
    height: 100% !important;
  }
</style>

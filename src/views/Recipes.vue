<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Recipes</h1>
      </v-flex>
      <v-flex xs12>
        <recipes-list class="mt-2" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import RecipesList from "../components/RecipesList";

    export default {
        name: "Recipes",
        components: {
            recipesList: RecipesList
        }
    }
</script>

<style scoped>
  recipes-list {
    display: block;
  }
</style>

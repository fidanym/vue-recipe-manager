<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Recipes</h1>
      </v-flex>
      <v-flex xs12>
        <v-skeleton-loader
            v-if="isLoading"
            max-height="370"
            type="table"
            transition="fade-transition"
        ></v-skeleton-loader>
        <recipes-list v-if="!isLoading && this.recipes !== null" :recipes="recipes" class="mt-2"/>
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
    },
    computed: {
      recipes() {
        return this.$store.getters.recipes
      },
      isLoading() {
        return this.recipes === 'loading'
      }
    },
    created() {
      this.$store.dispatch('loadRecipes')
    }
  }
</script>

<style scoped>
  recipes-list {
    display: block;
  }
</style>

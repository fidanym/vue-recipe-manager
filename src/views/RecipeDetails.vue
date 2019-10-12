<template>
  <v-container>
    <confirm-dialog ref="confirm"></confirm-dialog>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>{{ recipe.name }} <small>from {{ recipe.source }}</small></h1>
        <v-divider class="mb-2"></v-divider>
      </v-flex>
      <v-flex xs12 md6>
        <h5>
          <v-icon size="20">mdi-clock-outline</v-icon>
          {{ recipe.prep_time | formatMinutes }}
        </h5>
        <h4 class="mt-5">Ingredients</h4>
        <ul>
          <li v-for="ingredient in recipe.ingredients">
            {{ ingredient.qty }} x {{ ingredient.name }}
          </li>
        </ul>
        <v-btn @click="deleteRecipe" text small color="error" class="mt-5">Delete this recipe</v-btn>
      </v-flex>
      <v-flex xs12 md6>
        <h3>Instructions</h3>
        <p>{{ recipe.instructions }}</p>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import ConfirmDialog from "../components/ConfirmDialog";

  export default {
    name: "RecipeDetails",
    components: {
      confirmDialog: ConfirmDialog
    },
    props: {
      recipe: Object
    },
    methods: {
      deleteRecipe() {
        this.$refs.confirm.open('Delete', 'Are you sure you want to remove this recipe?', {color: '#C62828'})
            .then(confirm => {
              if (confirm) {
                this.$store.dispatch('deleteRecipe', this.recipe.id)
                    .then(() => {
                      this.$router.push('/')
                    })
              }
            })
      }
    }
  }
</script>

<style scoped>

</style>

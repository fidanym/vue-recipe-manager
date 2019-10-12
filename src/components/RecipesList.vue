<template>
  <div>
    <confirm-dialog ref="confirm"></confirm-dialog>
    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Name</th>
          <th class="text-left">Source</th>
          <th class="text-left">No. of ingredients</th>
          <th class="text-left">Ingredients</th>
          <th class="text-left">Instructions</th>
          <th class="text-left">Prep time</th>
          <th class="text-left">Details</th>
          <th class="text-left">Delete</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="recipe in recipes" :key="recipe.id">
          <td>{{ recipe.id }}</td>
          <td>{{ recipe.name }}</td>
          <td>{{ recipe.source }}</td>
          <td>{{ recipe.ingredients.length }}</td>
          <td>{{ displayIngredients(recipe.ingredients) }}</td>
          <td>{{ recipe.instructions | shortenText(50) }}</td>
          <td>{{ recipe.prep_time | formatMinutes }}</td>
          <td>
            <v-btn :to="{ name: 'recipe', params: { id: recipe.id, recipe: recipe }}" text icon color="blue">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn @click="deleteRecipe(recipe.id)" text icon color="red">
              <v-icon>mdi-minus-circle-outline</v-icon>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>

  import ConfirmDialog from "./ConfirmDialog";

  export default {
    name: "RecipesList",
    components: {
      confirmDialog: ConfirmDialog
    },
    props: {
      recipes: Array
    },
    methods: {
      displayIngredients(ingredients) {
        ingredients = ingredients.map(ingredient => {
          return ingredient.name
        })

        if (ingredients.length <= 3) {
          return ingredients.join(', ')
        }

        return ingredients.slice(0, 3).join(', ') + '...';
      },

      deleteRecipe(recipe_id) {
        this.$refs.confirm.open('Delete', 'Are you sure you want to remove this recipe?', {color: '#C62828'})
            .then(confirm => {
              if (confirm) {
                this.$store.dispatch('deleteRecipe', recipe_id)
              }
            })
      }
    }
  }
</script>

<style scoped>

</style>

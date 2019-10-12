// This is an API mock, just replace static data with axios calls
import recipes from './data/recipes'
import ingredients from './data/ingredients'

const getRecipes = function (recipes, time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(recipes)
    }, time)
  })
}

const removeRecipe = function (recipes, recipe_id, time) {
  return new Promise(resolve => {
    setTimeout(() => {
      let index = recipes.findIndex(recipe => recipe.id === recipe_id)
      if (index >= 0) {
        recipes.splice(index, 1)
      }
      resolve(recipes)
    }, time)
  })
}

const getIngredients = function (ingredients, time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(ingredients)
    }, time)
  })
}

export default {
  fetchRecipes() {
    return getRecipes(recipes, 500)
  },

  deleteRecipe(recipe_id) {
    return removeRecipe(recipes, recipe_id, 250)
  },

  fetchIngredients() {
    return getIngredients(ingredients, 100)
  }
}

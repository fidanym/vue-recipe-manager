import Vue from 'vue'
import Vuex from 'vuex'
import client from './api/mock/index.js'

Vue.use(Vuex)

const SET_RECIPES = 'SET_RECIPES'
//const SET_INGREDIENTS = 'SET_INGREDIENTS'

export default new Vuex.Store({
  state: {
    recipes: null,
    //ingredients: null
  },
  mutations: {
    [SET_RECIPES] (state, recipes) {
      state.recipes = recipes
    },

    /*[SET_INGREDIENTS] (state, ingredients) {
      state.ingredients = ingredients
    }*/
  },
  actions: {
    loadRecipes: ({commit}) => {
      commit(SET_RECIPES, 'loading')

      client.fetchRecipes()
          .then(recipes => {
            commit(SET_RECIPES, recipes)
          })
    },

    deleteRecipe: ({commit}, recipe_id) => {
      client.deleteRecipe(recipe_id)
          .then(recipes => {
            commit(SET_RECIPES, recipes)
          })
    },

    addRecipe: ({commit}, recipe) => {
      client.addRecipe(recipe)
          .then(recipes => {
            commit(SET_RECIPES, recipes)
          })
    }

    /*loadIngredients: ({commit}) => {
      commit(SET_INGREDIENTS, 'loading')

      return new Promise((resolve, reject) => {
        client.fetchIngredients()
            .then(ingredients => {
              commit(SET_INGREDIENTS, ingredients)
              resolve(ingredients)
            })
            .catch(() => {
              reject()
            })
      })

    }*/
  },
  getters: {
    recipes: state => {
      return state.recipes
    },

    /*ingredients: state => {
      return state.ingredients
    }*/
  }
})

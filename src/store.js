import Vue from 'vue'
import Vuex from 'vuex'
import client from './api/mock/index.js'

Vue.use(Vuex)

const SET_RECIPES = 'SET_RECIPES'

export default new Vuex.Store({
  state: {
    recipes: null
  },
  mutations: {
    [SET_RECIPES](state, recipes) {
      state.recipes = recipes
    }
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
    }
  },
  getters: {
    recipes: state => {
      return state.recipes
    }
  }
})

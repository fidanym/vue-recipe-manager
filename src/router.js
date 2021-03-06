import Vue from 'vue'
import Router from 'vue-router'
import Recipes from './views/Recipes.vue'
import RecipeDetails from "./views/RecipeDetails";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'recipes',
      component: Recipes
    },
    {
      path: '/create',
      name: 'createRecipe',
      component: () => import( './views/CreateRecipe.vue')
    },
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: RecipeDetails,
      props: true
    }
  ]
})

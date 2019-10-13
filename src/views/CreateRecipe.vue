<template>
  <v-container>
    <alert-dialog ref="alert"></alert-dialog>
    <confirm-dialog ref="confirm"></confirm-dialog>
    <v-layout row wrap>
      <v-row>
        <v-col cols="10">
          <h1>Create a new recipe</h1>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="action-buttons">
          <v-btn @click="cancelSave" text large color="blue-grey lighten-3">
            <v-icon size="20">mdi-close</v-icon>
            Cancel
          </v-btn>
          <v-btn @click="saveRecipe" text large color="red">
            <v-icon size="20">mdi-plus</v-icon>
            Save
          </v-btn>
        </v-col>
      </v-row>
      <v-flex xs12>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" md="4" sm="12">

                <v-row>
                  <v-col md="10" sm="12">
                    <v-text-field
                        v-model="name"
                        label="Recipe name"
                        color="red"
                        :rules="standardRules"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col md="10" sm="12">
                    <v-text-field
                        v-model="source"
                        label="Source"
                        color="red"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col md="4" sm="6">
                    <v-text-field
                        v-model="prep_time"
                        label="Preparation time"
                        placeholder="HH:MM"
                        color="red"
                        v-mask="'##:##'"
                        :rules="standardRules"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <div class="ingredients">
                  <div class="ingredient" v-if="ingredients_loaded"
                       v-for="ingredient in ingredients">
                    <v-checkbox
                        v-model="ingredient.selected"
                        :label="ingredient.name"
                        color="red"
                        class="qty-checkbox"
                    ></v-checkbox>
                    <v-text-field
                        :disabled="!ingredient.selected"
                        v-model="ingredient.qty"
                        class="ml-2 qty-input"
                        type="number"
                        min="1"
                        value="1"
                        color="red"
                        single-line
                        dense
                        filled
                    ></v-text-field>
                  </div>
                </div>

                <span v-if="!selectedIngredients.length" class="red--text caption">The recipe must have at least one ingredient</span>
              </v-col>

              <v-col cols="12" md="8" sm="12">

                <v-row>
                  <v-col>
                    <v-textarea
                        v-model="instructions"
                        label="Instructions"
                        hint="Give instructions on preparing this recipe"
                        color="red"
                        rows="35"
                        :rules="standardRules"
                        filled
                    ></v-textarea>
                  </v-col>
                </v-row>

              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import client from '../api/mock/index.js'
  import AlertDialog from "../components/AlertDialog";
  import ConfirmDialog from "../components/ConfirmDialog";

  export default {
    name: "CreateRecipe",
    components: {
      alertDialog: AlertDialog,
      confirmDialog: ConfirmDialog
    },
    data: () => ({
      name: '',
      source: '',
      prep_time: '',
      instructions: '',
      ingredients: [],
      ingredients_loaded: true,
      standardRules: [
        v => !!v || 'This field is required'
      ]
    }),
    computed: {
      selectedIngredients() {
        return this.ingredients.filter(ingredient => ingredient.selected)
      }
    },
    methods: {
      cancelSave() {
        this.$refs.confirm.open('Forget about this recipe', 'The details you might have already entered' +
            ' will be lost. Are you sure you want to cancel?', {color: '#C62828'})
            .then(confirm => {
              if (confirm) {
                this.$router.push('/')
              }
            })
      },

      saveRecipe() {
        if (this.$refs.form.validate() && this.selectedIngredients.length) {

          let recipe = {
            name: this.name,
            source: this.source,
            prep_time: this.formatTimeInMinutes(this.prep_time),
            instructions: this.instructions,
            ingredients: this.selectedIngredients.map(ingredient => {
              return {name: ingredient.name, qty: ingredient.qty}
            })
          };

          this.$store.dispatch('addRecipe', recipe)
              .then(() => {
                this.$router.push('/')
              })
        } else {
          this.$refs.alert.open('Oops', 'You seem to have forgotten an important part of the recipe, ' +
              'please have another look.', {color: '#C62828'})
        }
      },

      formatTimeInMinutes(time_string) {
        if (time_string.length <= 2) {
          return parseInt(time_string)
        }

        let time = time_string.split(':');
        return parseInt(time[0]) * 60 + parseInt(time[1]);
      }
    },
    created() {
      client.fetchIngredients()
          .then(ingredients => {
            this.ingredients = ingredients.map(ingredient => {
              return {name: ingredient, qty: 1, selected: false}
            })
            this.ingredients_loaded = true;
          })
    }
  }
</script>

<style scoped>
  .action-buttons {
    display: flex;
  }

  .ingredients {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
  }

  .ingredient {
    display: flex;
  }

  .qty-input {
    max-width: 65px;
  }

  .qty-checkbox {
    width: 150px;
  }
</style>

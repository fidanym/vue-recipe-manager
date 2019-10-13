<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Create a new recipe</h1>
      </v-flex>
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
                        color="red"
                        v-mask="'##:##'"
                        :rules="standardRules"
                    ></v-text-field>
                  </v-col>
                </v-row>

              </v-col>

              <v-col cols="12" md="8" sm="12">

                <v-row>
                  <v-col>
                    <v-textarea
                        v-model="instructions"
                        label="Instructions"
                        hint="Give instructions on preparing this recipe"
                        color="red"
                        :rules="standardRules"
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
  export default {
    name: "CreateRecipe",
    data: () => ({
      name: '',
      source: '',
      prep_time: '',
      instructions: '',
      standardRules: [
        v => !!v || 'This field is required'
      ]
    }),
    methods: {
      saveRecipe() {
        if (this.$refs.form.validate()) {
          console.log('Form is valid')
        } else {
          console.log('Form is invalid')
        }
      }
    },
    computed: {
      ingredients() {
        return this.$store.getters.ingredients
      },

      isLoading() {
        return this.ingredients === 'loading'
      }
    },
    created() {
      this.$store.dispatch('loadIngredients')
    }
  }
</script>

<style scoped>

</style>

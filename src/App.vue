<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row>
          <v-col>
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <bottom-navigation/>
  </v-app>
</template>

<script>

    import BottomNavigation from "./components/BottomNavigation";

    export default {
        name: 'App',
        components: {
            bottomNavigation: BottomNavigation
        },
        data: () => ({}),
    };
</script>

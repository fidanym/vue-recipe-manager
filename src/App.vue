<template>
  <v-app>
    <v-content>
      <router-view/>
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

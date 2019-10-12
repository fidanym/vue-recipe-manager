<template>
  <div v-show="isLoading" class="loading-spinner">
    <v-progress-circular indeterminate color="red"></v-progress-circular>
  </div>
</template>

<script>
  export default {
    name: "Loader",
    props: {
      isLoading: Boolean
    }
  }
</script>

<style scoped>
  .loading-spinner {
    position: relative;
    left: 50%;
    margin-top: 100px;
  }
</style>

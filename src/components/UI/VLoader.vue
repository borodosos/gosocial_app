<template>
  <div class="loader">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loader {
  background-color: #fff;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 1px 10px 0 rgb(204, 204, 204);
}
</style>

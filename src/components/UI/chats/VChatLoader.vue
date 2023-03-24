<template>
  <div class="chat-loader">
    <v-progress-circular
      :size="50"
      color="purple"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.chat-loader {
  background-color: white;
  border-radius: 16px;
  text-align: center;
  width: fit-content;
  padding: 8px;
  box-shadow: 0 0 8px rgb(0, 132, 255);
  backdrop-filter: blur(20px);
}
</style>

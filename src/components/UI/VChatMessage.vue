<template>
  <div class="message">
    <div class="message__wrapper">
      <div class="message__header">
        <v-avatar
          class="message__header-avatar"
          size="45"
          color="purple darken-1"
        >
          <!-- <img :src="setImageProfile" alt="alt" /> -->
        </v-avatar>
        <div class="message__header-content">
          <span class="message__user-name"> Aboba Abobus </span>
          <span class="message__data"> dadasdadadsd </span>
        </div>
      </div>
      <div class="message__body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate
        commodi repellendus illo aliquid reiciendis iure. Ipsa quasi, aliquam
        fuga repellendus dolores, cumque corporis enim itaque atque natus unde
        eveniet maxime?
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.message {
  font-family: "Rubik";
  &__wrapper {
    padding: 8px 0;
  }

  &__header {
    display: flex;
  }

  &__header-avatar {
    cursor: pointer;
  }

  &__header-content {
    padding-left: 8px;
    display: flex;
    flex-direction: column;
  }

  &__user-name {
    font-weight: bold;
    cursor: pointer;
  }

  &__data {
    color: #8b8b8b;
    font-size: 0.8em;
  }

  &__body {
    padding-top: 4px;
  }
}
</style>

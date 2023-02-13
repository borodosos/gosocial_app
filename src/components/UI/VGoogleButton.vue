<template>
  <button type="button" class="google-button" @click="fetchGoogleAuth">
    <img class="google-button__icon" src="@/assets/google-icon.svg" />
    Continue with Google
  </button>
</template>

<script>
export default {
  methods: {
    fetchGoogleAuth() {
      this.$store.dispatch("userGoogleAuth").then((value) => {
        window.location.replace(value);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.google-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 15px #adadad;
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.1s linear;

  &:hover {
    background-color: #adadad;
  }

  &:active {
    background-color: #ffff;
  }

  &__icon {
    width: 15%;
  }
}
</style>

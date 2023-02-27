<template>
  <div>
    <button type="button" class="google-button" @click="fetchGoogleAuth">
      <img class="google-button__icon" src="@/assets/google-icon.svg" />
      Continue with Google
    </button>
    <Toast position="bottom-left" group="bl" />
  </div>
</template>

<script>
import { googleAuth } from "@/http/userApi";
import Toast from "primevue/toast/Toast";

export default {
  methods: {
    fetchGoogleAuth() {
      googleAuth()
        .then((url) => {
          window.location.replace(url);
        })
        .catch((error) =>
          this.$toast.add({
            severity: "error",
            summary: "Login",
            detail: error,
            group: "bl",
            life: 3000,
          })
        );
    },
  },
  components: { Toast },
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
  background: linear-gradient(
    180deg,
    rgb(139, 241, 255),
    rgb(233, 246, 255),
    rgb(139, 241, 255)
  );

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

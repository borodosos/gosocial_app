<template>
  <section class="login container">
    <div class="login__wrapper card">
      <div class="login__title">Welcome to the GoSocial!</div>
      <v-form ref="form" v-model="valid" class="login__form" @submit="onSubmit">
        <div class="login__email">
          <v-text-field
            v-model="email"
            :rules="emailRules()"
            label="E-mail"
            name="email"
            required
            outlined
          >
          </v-text-field>
        </div>
        <div class="login__password">
          <v-text-field
            v-model="password"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passRules()"
            :type="showPass ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 8 characters"
            counter
            outlined
            @click:append="showPass = !showPass"
          ></v-text-field>
        </div>
        <div class="login__google-button-container mb-2">
          <VGoogleButton />
        </div>
        <div class="login__form-submit-container">
          <div>
            Don't have an account?
            <router-link to="/registration">Sign Up</router-link>
          </div>
          <v-btn :loading="loading" rounded type="submit">Log In</v-btn>
        </div>
      </v-form>
    </div>
    <Toast position="bottom-left" group="blogin" />
  </section>
</template>

<script>
import VGoogleButton from "@/components/UI/VGoogleButton.vue";
import Toast from "primevue/toast";
export default {
  components: {
    Toast,
    VGoogleButton,
  },

  data() {
    return {
      loading: false,
      email: "",
      password: "",
      showPass: false,
      valid: true,
    };
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },

    passRules() {
      return [
        (v) => !!v || "Password required.",
        (v) => v.length >= 8 || "Min 8 characters",
      ];
    },

    emailRules() {
      return [
        (v) => !!v || "E-mail is required",
        (v) =>
          v.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) || "E-mail must be valid",
      ];
    },

    onSubmit(event) {
      event.preventDefault();
      this.validate();
      if (this.valid) {
        this.loading = true;
        const form = this.$refs.form.$el;
        const formData = new FormData(form);
        this.$store
          .dispatch("userLoginFetch", formData)
          .then((res) => {
            console.log(res);
            this.loading = !this.loading;
            this.$router.push("/");
          })
          .catch((error) => {
            this.$toast.add({
              severity: "error",
              summary: "Login",
              detail: error,
              group: "blogin",
              life: 3000,
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 0 8px #6aa5ff;
  backdrop-filter: blur(48px);
  min-width: 400px;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.login {
  position: relative;
  z-index: 1;

  &__wrapper {
    width: 40%;
  }

  &__title {
    font-weight: bold;
  }

  &__form {
    margin-top: 15px;
    .login__form-submit-container {
      display: flex;
    }

    .v-btn {
      display: block;
      background: linear-gradient(0deg, rgb(158, 160, 255), rgb(253, 239, 239));
      margin-left: auto;
    }
  }

  &__initials {
    .v-text-field:nth-child(1) {
      margin-right: 15px;
    }

    display: flex;
    justify-content: space-between;
  }

  &__cropper {
    height: 200px;

    img {
      object-fit: cover;
    }
  }
}
</style>

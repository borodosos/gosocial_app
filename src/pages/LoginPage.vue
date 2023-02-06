<template>
  <section class="login container">
    <div class="login__wrapper card">
      <div class="login__title">Welcome to the GoSocial!</div>
      <v-form ref="form" v-model="valid" class="login__form" @submit="onSubmit">
        <div class="login__email">
          <v-text-field
            v-model="email"
            :rules="emailRules"
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
            :rules="[passRules.required, passRules.min]"
            :type="showPass ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 8 characters"
            counter
            outlined
            @click:append="showPass = !showPass"
          ></v-text-field>
        </div>
        <div class="login__form-submit-container">
          <div>
            Don't have an account?
            <router-link to="/registration">Sign Up</router-link>
          </div>
          <v-btn :loading="loading" rounded type="submit">Log In</v-btn>
        </div>
      </v-form>
      <Toast position="bottom-left" group="bl" />
    </div>
  </section>
</template>

<script>
import Toast from "primevue/toast";

export default {
  components: {
    Toast,
  },
  data() {
    return {
      loading: false,
      email: "",
      password: "",
      showPass: false,
      passRules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      valid: true,
    };
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },

    onSubmit(event) {
      event.preventDefault();
      this.validate();
      if (this.valid) {
        this.loading = true;
        const form = this.$refs.form.$el;
        let formData = new FormData(form);
        this.$store
          .dispatch("userLoginFetch", formData)
          .then(() => {
            this.loading = !this.loading;
            this.$router.push("/");
          })
          .catch((error) => {
            this.$toast.add({
              severity: "error",
              summary: "Login",
              detail: error,
              group: "bl",
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
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 1px 10px 0 rgb(185, 185, 185);
}

.container {
  margin-top: 5%;
  display: flex;
  justify-content: center;
}

.login {
  position: relative;
  z-index: 1;

  &__wrapper {
    width: 50%;
    background-color: white;
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

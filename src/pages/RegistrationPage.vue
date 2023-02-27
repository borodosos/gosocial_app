<template>
  <section class="registration container">
    <div class="registration__wrapper card">
      <div class="registration__title">Welcome to the GoSocial!</div>
      <v-form
        ref="form"
        v-model="valid"
        class="registration__form"
        @submit="onSubmit"
      >
        <div class="registration__initials">
          <v-text-field
            v-model="firstName"
            label="First Name"
            name="firstName"
            :rules="[firstNameRule]"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="secondName"
            label="Second Name"
            name="secondName"
            :rules="[secondNameRule]"
            outlined
          ></v-text-field>
        </div>

        <div class="registration__email">
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
        <div class="registration__password">
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
        <div class="registration__form-submit-container">
          <div>
            Already have an account?
            <router-link to="/login">Log In</router-link>
          </div>
          <v-btn :loading="loading" rounded type="submit">Sign Up</v-btn>
        </div>
      </v-form>
      <Toast position="bottom-left" group="bl" />
    </div>
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
      email: "",
      password: "",
      firstName: "",
      secondName: "",
      valid: true,
      showPass: false,
      loading: false,
    };
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },

    firstNameRule: (value) => !!value || "First name is required.",
    secondNameRule: (value) => !!value || "Second name is required.",

    passRules() {
      return [
        (value) => !!value || "Password is required.",
        (value) => value.length >= 8 || "Min 8 characters",
      ];
    },

    emailRules() {
      return [
        (value) => !!value || "E-mail is required.",
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
      ];
    },

    onSubmit(event) {
      event.preventDefault();
      this.validate();
      if (this.valid) {
        event.preventDefault();
        this.loading = true;
        const a = this.$refs.form.$el;
        const formData = new FormData(a);
        this.$store
          .dispatch("userRegisterFetch", formData)
          .then(() => {
            this.$router.push("/");
          })
          .catch((error) => {
            this.$toast.add({
              severity: "error",
              summary: "Registration",
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
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 0 8px 0 #6aa5ff;
  backdrop-filter: blur(48px);
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.registration {
  display: relative;
  z-index: 1;

  &__wrapper {
    width: 40%;
  }

  &__title {
    font-weight: bold;
  }

  &__form {
    margin-top: 12px;
    .registration__form-submit-container {
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
      margin-right: 12px;
    }

    display: flex;
    justify-content: space-between;
  }
}
</style>

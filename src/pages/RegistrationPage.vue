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
            :rules="emailRules"
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
        <div class="registration__form-submit-container">
          <div>
            Already have an account?
            <router-link to="/login">Log In</router-link>
          </div>
          <v-btn :loading="loading" rounded type="submit">Sign Up</v-btn>
        </div>
      </v-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      secondName: "",
      valid: true,
      showPass: false,
      loading: false,
      firstNameRule: (value) => !!value || "First name is required.",
      secondNameRule: (value) => !!value || "Second name is required.",
      passRules: {
        required: (value) => !!value || "Password is required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      emailRules: [
        (v) => !!v || "E-mail is required.",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
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
        console.log("success");
      } else if (!this.valid) {
        return null;
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

.registration {
  display: relative;
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

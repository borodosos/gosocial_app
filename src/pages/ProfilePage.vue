<template>
  <section class="profile container">
    <transition name="component-fade" mode="out-in">
      <VLoader v-if="loadingProfile" />
      <div v-else class="profile__wrapper card">
        <div class="profile__body">
          <div class="profile__sidebar">
            <p class="profile__profile-name">Shrek Shrekovich</p>
            <v-avatar size="180" color="black">
              <img src="@/assets/photos/somebody.jpeg" alt="alt" />
              <div class="avatar-overlay" @click="dialog = !dialog"></div>
            </v-avatar>
            <VProfileModal :modalDialog="dialog" />
          </div>

          <div class="profile__content">
            <div class="profile__main-settings">
              <div class="profile__main-settings-title">Main Setting</div>
              <div class="profile__main-settings-body">
                <div class="profile__first-name">
                  <span class="mr-2 settings-title">First Name: </span>
                  <VProfileField
                    :valueChangeable="firstNameChangeable"
                    :valueProp="firstName"
                  />
                </div>
                <div class="profile__second-name">
                  <span class="mr-2 settings-title">Second Name: </span>
                  <VProfileField
                    :valueChangeable="secondNameChangeable"
                    :valueProp="secondName"
                  />
                </div>
                <div class="profile__email">
                  <span class="mr-2 settings-title">Email: </span>
                  <VProfileField
                    :valueChangeable="emailChangeable"
                    :valueProp="email"
                  >
                  </VProfileField>
                </div>
                <div class="profile__pass">
                  <span class="mr-2 settings-title">Password: </span>
                  <VProfileField
                    :valueChangeable="passwordChangeable"
                    :valueProp="password"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="profile__footer">
          <p class="profile__footer-title">My Posts</p>
          <ul class="profile__posts">
            <li class="profile__list-element"><VPost /></li>
            <li class="profile__list-element"><VPost /></li>
            <li class="profile__list-element"><VPost /></li>
            <li class="profile__list-element"><VPost /></li>
          </ul>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import VPost from "@/components/UI/VPost.vue";
import VLoader from "@/components/UI/VLoader.vue";
import VProfileField from "@/components/UI/VProfileField.vue";
import VProfileModal from "@/components/UI/VProfileModal.vue";

export default {
  components: {
    VPost,
    VProfileField,
    VLoader,
    VProfileModal,
  },
  data() {
    return {
      firstNameChangeable: false,
      firstName: "Shrek",
      secondNameChangeable: false,
      secondName: "Shrekovich",
      emailChangeable: false,
      email: "user@mail.ru",
      passwordChangeable: false,
      password: "*****",
      loadingProfile: true,
      dialog: false,
    };
  },

  created() {
    setTimeout(() => {
      this.loadingProfile = false;
    }, 1000);
  },

  methods: {
    changeFirstName() {
      this.firstNameChangeable = !this.firstNameChangeable;
    },
    changeSecondName() {
      this.secondNameChangeable = !this.secondNameChangeable;
    },
    changeEmail() {
      this.emailChangeable = !this.emailChangeable;
    },
    changePassword() {
      this.passwordChangeable = !this.passwordChangeable;
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 10px 0 rgb(185, 185, 185);
  min-width: 500px;
}

.container {
  margin: 1.8em 0;
  display: flex;
  justify-content: center;
}

.file-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile {
  display: relative;
  z-index: 1;

  &__wrapper {
    width: 50%;
    background-color: #fff;
  }

  &__body {
    display: flex;
    margin-bottom: 4%;
  }

  &__sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px 5px rgb(206, 206, 206);
    align-self: center;
  }

  .settings-title {
    font-weight: bold;
  }

  .input {
    border-radius: 28px;
    padding: 4px 16px;
    margin: 4px 0;
  }

  .v-avatar {
    margin: 10px 0;
    position: relative;
  }

  .avatar-overlay {
    width: 100%;
    height: 100%;
    background-color: #8b8b8b;
    position: absolute;
    opacity: 0;
    transition: opacity 0.2s;
    background: url("@/assets/Green-Add-Button-PNG.png") no-repeat, #8b8b8b;
    background-position: 50% 50%;
    background-size: 50%;
  }

  .v-avatar:hover .avatar-overlay {
    opacity: 0.5;
  }

  .cropper {
    max-height: 460px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__main-settings {
  }

  &__main-settings-title {
    color: #c0c0c0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
    margin-bottom: 10px;
    white-space: nowrap;
  }
  &__main-settings-title::after,
  &__main-settings-title::before {
    content: "";
    display: inline-block;
    width: 100%;
    margin: 0 15px;
    height: 1px;
    background-color: #c0c0c0;
  }

  &__main-settings-body {
    display: flex;
    flex-direction: column;
    margin-left: 1.5em;
  }

  &__icons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__info {
  }

  &__first-name,
  &__second-name,
  &__email,
  &__pass {
    display: flex;
    align-items: center;
  }

  & i {
    margin-right: 15px;
  }

  & .v-btn {
    margin-left: auto;
  }

  & .v-btn i {
    margin: 0;
  }

  &__footer {
  }

  &__posts {
    display: flex;
    overflow-x: auto;
    border-radius: 10px;
    box-shadow: inset 0 0 10px 5px rgb(206, 206, 206);
    padding: 10px;
    list-style: none;
  }

  &__posts::-webkit-scrollbar {
    opacity: 0;
    height: 8px;
  }

  &__posts::-webkit-scrollbar-thumb {
    display: block;
    border-radius: 10px;
    background-color: black;
  }

  &__footer-title {
    color: #c0c0c0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
    margin-bottom: 10px;
    white-space: nowrap;
  }

  &__footer-title::after,
  &__footer-title::before {
    content: "";
    display: inline-block;
    width: 100%;
    margin: 0 15px;
    height: 1px;
    background-color: #c0c0c0;
  }

  &__list-element {
    margin-top: 0;
    transform: scale(0.9);
    cursor: pointer;
  }

  &__list-element::v-deep .post__img,
  &__list-element::v-deep .post__header {
    display: none;
  }

  &__list-element:hover {
    transform: scale(1);
  }
}
</style>

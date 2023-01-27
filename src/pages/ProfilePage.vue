<template>
  <section class="profile container">
    <transition name="component-fade" mode="out-in">
      <VLoader v-if="loadingProfile" />
      <div v-else class="profile__wrapper card">
        <div class="profile__body">
          <div class="profile__sidebar">
            <p class="profile__profile-name">Shrek Shrekovich</p>
            <v-avatar size="200" color="black">
              <img src="@/assets/photos/somebody.jpeg" alt="alt" />
              <div class="avatar-overlay" @click="dialog = !dialog"></div>
            </v-avatar>
            <v-dialog v-model="dialog" class="profile__dialog" width="500">
              <v-card class="profile__dialog">
                <v-card-title class="text-h5 grey lighten-2">
                  Please, crop the image
                </v-card-title>
                <div class="pa-5">
                  <FormulateInput
                    v-model="file"
                    class="file-input"
                    @file-upload-complete="uploadFile"
                    @file-removed="imgSrc = ''"
                    type="image"
                    label="Post Image"
                    validation="mime:image/jpeg,image/jpg,image/png"
                    help="Download your image"
                  />
                  <Cropper
                    class="cropper"
                    :src="imgSrc"
                    @change="onChange"
                    :debounce="false"
                    :stencil-props="{
                      aspectRatio: 1,
                    }"
                    stencil-component="circle-stencil"
                  />
                </div>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="registration__button" rounded>Set image</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>

          <div class="profile__content">
            <div class="profile__main-settings">
              <div class="profile__main-settings-title">Main Setting</div>
              <div class="profile__main-settings-body">
                <div class="profile__first-name">
                  <span class="mr-2">First Name: </span>
                  <span v-if="!firstNameChangeable">Shrek</span>

                  <InputText
                    class="input"
                    v-else
                    v-model="firstNameChanged"
                    autofocus
                    type="text"
                  />

                  <v-btn icon text small @click="changeFirstName">
                    <v-icon size="18">mdi-pencil</v-icon>
                  </v-btn>
                </div>
                <div class="profile__second-name">
                  <span class="mr-2">Second Name: </span>
                  <span v-if="!secondNameChangeable">Shrekovich</span>
                  <InputText
                    class="input"
                    v-else
                    v-model="secondNameChanged"
                    autofocus
                    type="text"
                  />
                  <v-btn icon text small @click="changeSecondName">
                    <v-icon size="18">mdi-pencil</v-icon>
                  </v-btn>
                </div>
                <p class="profile__email">
                  <span class="mr-2">Email: </span>
                  <span v-if="!emailChangeable">example@dd.com</span>
                  <InputText
                    class="input"
                    v-else
                    v-model="emailChanged"
                    autofocus
                    type="text"
                  />
                  <v-btn icon text small @click="changeEmail">
                    <v-icon size="18">mdi-pencil</v-icon>
                  </v-btn>
                </p>
                <div class="profile__pass">
                  <span class="mr-2">Password: </span>
                  <span v-if="!passwordChangeable">123456789</span>
                  <InputText
                    class="input"
                    v-else
                    v-model="passwordChanged"
                    autofocus
                    type="text"
                  />
                  <v-btn icon text small @click="changePassword">
                    <v-icon size="18">mdi-pencil</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>

            <div class="profile__advanced-settings">
              <div class="profile__advanced-settings-title">
                Advanced Setting
              </div>
              <div class="profile__advanced-settings-body">
                <div class="profile__place">
                  <i class="fa-duotone fa-location-dot"></i>
                  <span>Russia, Boloto</span>
                  <v-btn icon text small>
                    <v-icon size="18">mdi-pencil</v-icon>
                  </v-btn>
                </div>
                <div class="profile__status">
                  <i class="fa-duotone fa-briefcase-blank"></i>
                  <span>Ogre</span>
                  <v-btn icon text small>
                    <v-icon size="18">mdi-pencil</v-icon>
                  </v-btn>
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
import InputText from "primevue/inputtext";
import { Cropper } from "vue-advanced-cropper";

export default {
  components: {
    VPost,
    InputText,
    VLoader,
    Cropper,
  },
  data() {
    return {
      firstNameChangeable: false,
      firstNameChanged: "",
      secondNameChangeable: false,
      secondNameChanged: "",
      emailChangeable: false,
      emailChanged: "",
      passwordChangeable: false,
      passwordChanged: "",
      loadingProfile: true,
      dialog: false,
      file: null,
      imgSrc: "",
      result: {
        coordinates: null,
        image: null,
      },
    };
  },

  created() {
    setTimeout(() => {
      this.loadingProfile = false;
    }, 1000);
  },

  methods: {
    async uploadFile() {
      const reader = new FileReader();
      if (this.file) {
        reader.readAsDataURL(this.file.fileList[0]);
        reader.onload = () => {
          this.imgSrc = reader.result;
        };
      }
    },

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

    onChange({ coordinates, image }) {
      this.result = {
        coordinates,
        image,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 10px 0 rgb(185, 185, 185);
  min-width: 700px;
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

  &__first-name span:nth-child(1),
  &__second-name span:nth-child(1) {
    font-weight: bold;
  }

  .input {
    border-radius: 28px;
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

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
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

  &__name span:nth-child(1),
  &__email span:nth-child(1),
  &__pass span:nth-child(1) {
    font-weight: bold;
  }

  &__advanced-settings {
  }

  &__advanced-settings-title {
    color: #c0c0c0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
    margin: 10px 0;
    white-space: nowrap;
  }
  &__advanced-settings-title::after,
  &__advanced-settings-title::before {
    content: "";
    display: inline-block;
    width: 100%;
    height: 1px;
    margin: 0 15px;
    background-color: #c0c0c0;
  }

  &__advanced-settings-body {
    margin-left: 1.5em;
    i {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
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
  &__pass,
  &__place,
  &__status {
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
  &__list-element:hover {
    transform: scale(1);
  }
}
</style>

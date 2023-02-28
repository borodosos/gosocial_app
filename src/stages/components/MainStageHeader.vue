<template>
  <section class="main-header panel">
    <div class="main-header__wrapper">
      <v-form ref="form" v-model="valid">
        <div class="main-header__search">
          <div class="main-header__search-wrapper">
            <div class="main-header__back-input title">
              <InputText
                class="input"
                v-show="isTitleInput"
                v-model="postTitle"
                @focus.native="showBackgroundTitle"
                @blur="showBackgroundTitle"
                type="text"
                name="title"
                placeholder="Write title..."
              />
            </div>
            <div class="main-header__back-input text">
              <InputText
                class="input"
                type="text"
                name="text"
                v-model="postText"
                placeholder="What's on your mind..."
                @focus.native="showBackgroundText"
                @blur="showBackgroundText"
                @click="showTitleInput"
              />
            </div>
          </div>
        </div>

        <div class="main-header__content">
          <div class="main-header__menu">
            <FormulateInput
              class="main-header__file-input"
              v-model="postFile"
              v-show="fileInput"
              @file-removed="postFile = null"
              @file-upload-complete="fileUploaded = true"
              type="image"
              name="image"
              label="Post Image"
              validation="mime:image/jpeg,image/jpg,image/png"
              help="Download your image"
            />
            <div class="main-header__tags-container pt-2">
              <v-chip
                v-for="(tag, index) in postTags"
                :key="index"
                small
                close
                close-icon="mdi-delete"
                @click:close="remove(tag)"
                >{{ tag }}</v-chip
              >
            </div>
            <v-divider />
            <div class="main-header__menu-buttons">
              <div class="main-header__crumbs">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="button-icon-menu"
                      v-on="on"
                      @click="showFileInput"
                      icon
                    >
                      <i class="fa-duotone fa-image"></i>
                    </v-btn>
                  </template>
                  <span>Image</span>
                </v-tooltip>
                <VSelectTags
                  :placeholder="'Tags'"
                  :options="tags"
                  @add-tag="addTag"
                />
              </div>
              <v-btn
                class="indigo button-post"
                type="submit"
                rounded
                @click="onSubmit"
                >POST</v-btn
              >
            </div>
          </div>
        </div>
      </v-form>
      <Toast position="bottom-left" group="bl" />
    </div>
  </section>
</template>

<script>
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import VSelectTags from "@/components/UI/VSelectTags.vue";

export default {
  components: {
    InputText,
    Toast,
    VSelectTags,
  },

  data() {
    return {
      valid: true,
      postTitle: "",
      postText: "",
      postTags: [],
      postFile: null,
      postLikes: 0,
      selectedTag: "",
      fileInput: false,
      tags: ["IT", "Film", "Sport", "Music"],
      fileUploaded: false,

      // --- Value for style
      showbackText: false,
      myopacityText: 0,
      showbackTitle: false,
      myopacityTitle: 0,
      isTitleInput: false,
    };
  },

  methods: {
    addTag(event) {
      this.postTags.push(event.value);
      this.postTags = [...new Set(this.postTags)];
    },

    remove(item) {
      this.postTags.splice(this.postTags.indexOf(item), 1);
    },

    onSubmit(event) {
      event.preventDefault();
      if (
        !this.postTitle.trim().length ||
        !this.postText.trim().length ||
        !this.postTags.length ||
        !this.postFile
      ) {
        this.valid = false;
        return this.$toast.add({
          severity: "error",
          summary: "Login",
          detail: "Please, enter the text, title, file and tags",
          group: "bl",
          life: 3000,
        });
      }
      if (!this.fileUploaded) {
        return this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "File not uploaded yet",
          group: "bl",
          life: 3000,
        });
      }
      const form = this.$refs.form.$el;
      const formData = new FormData(form);
      formData.set("tags", this.postTags);
      this.$store
        .dispatch("fetchCreatePost", formData)
        .then(() => {
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Post created",
            group: "bl",
            life: 3000,
          });
        })
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: error.response.data,
            group: "bl",
            life: 3000,
          });
        })
        .finally(() => {
          this.postTitle = "";
          this.postText = "";
          this.postTags = [];
          this.postFile = null;
          this.postLikes = 0;
          this.selectedTag = "";
          this.fileInput = false;
          this.isTitleInput = false;
          this.fileUploaded = false;
        });
    },

    // === Functions for style
    showBackgroundText() {
      if (this.showbackText !== true) {
        this.showbackText = true;
        this.myopacityText = 0.4;
      } else {
        this.showbackText = false;
        this.myopacityText = 0;
      }
    },

    showBackgroundTitle() {
      if (this.showbackTitle !== true) {
        this.showbackTitle = true;
        this.myopacityTitle = 0.4;
      } else {
        this.showbackTitle = false;
        this.myopacityTitle = 0;
      }
    },

    showFileInput() {
      this.fileInput = !this.fileInput;
    },

    showTitleInput() {
      if (!this.postTitle) {
        this.isTitleInput = !this.isTitleInput;
      }
    },
  },
};
</script>

<style scoped>
.main-header__search-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: all 0.4s;
}

.main-header__search-wrapper .v-avatar {
  margin-right: 15px;
}

.v-divider {
  margin: 10px 0 10px;
}

.main-header__back-input {
  position: relative;
  z-index: 0;
  border-radius: 20px;
  width: 100%;
}

.p-inputtext {
  border-radius: 20px;
  width: 100%;
  color: black;
  padding: 10px;
  background: none;
  height: 46px;
}

.main-header__back-input.title {
  margin-bottom: 16px;
}

.main-header__back-input.text:before,
.main-header__back-input.title:before {
  content: "";
  background: linear-gradient(
    45deg,
    #13dcff,
    #8fff72,
    #d893ff,
    #0fe4f3,
    #12f1cc,
    #0f35ef,
    #7c13ef,
    #ef13bf,
    #de0d0d
  );
  position: absolute;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: 100%;
  height: 100%;
  animation: glowing 5s linear infinite;
  transition: all 0.4s;
  border-radius: 20px;
}

.main-header__back-input.text:before {
  opacity: v-bind(myopacityText);
}

.main-header__back-input.title:before {
  opacity: v-bind(myopacityTitle);
}

.main-header__back-input.text:hover:before {
  opacity: 0.4;
}

.main-header__back-input.title:hover:before {
  opacity: 0.4;
}

.p-inputtext:enabled:hover {
  border: 1px solid rgba(0, 0, 0, 0);
}

.main-header__file-input {
  margin: 5px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.main-header__tags-container .v-chip + .v-chip {
  margin-left: 5px;
}

.main-header__menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main-header__menu-buttons {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.main-header__crumbs {
  display: flex;
  width: 25%;
  justify-content: space-between;
}

.button-icon-menu {
  padding: 0 8px;
  transition: all 0.1s;
}

.button-icon-menu:hover {
  transform: scale(1.1);
  box-shadow: 0px 5px 12px 0px rgb(180, 180, 180);
}

.button-icon-menu:active {
  box-shadow: 0px 5px 12px 0px rgb(111, 219, 252);
}

.button-icon-menu i {
  font-size: 1.4em;
}

.button-icon-menu span {
  font-weight: bold;
  font-size: 0.8em;
  color: #8b8b8b;
  margin-left: 5%;
}

.button-post {
  background: linear-gradient(0deg, rgb(158, 160, 255), rgb(253, 239, 239));
  color: rgb(70, 70, 70);
}

.button-post:hover {
  transform: scale(1.1);
}

.button-tags:active {
  box-shadow: 0 0 5px rgb(111, 219, 252);
}

.button-post:active {
  box-shadow: 0 0 5px rgb(111, 219, 252);
  transform: scale(0.9);
}
</style>

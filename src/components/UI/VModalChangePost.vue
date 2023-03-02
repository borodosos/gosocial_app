<template>
  <v-dialog
    :value="confirmDialog"
    @click:outside="closeModal"
    persistent
    max-width="600"
  >
    <v-card class="change-post">
      <v-card-title class="pa-2"> Change your post </v-card-title>
      <div class="change-post__body">
        <v-form
          ref="formChangePost"
          v-model="valid"
          id="formChangePost"
          class="change-post__form"
          @submit="onSubmit"
        >
          <div class="change-post__changing-title">
            <v-btn
              v-if="!showTitleInput"
              class="default-button button-form-change"
              rounded
              @click="showTitleInput = true"
              >Change title</v-btn
            >
            <div class="box" v-else>
              <v-text-field
                v-model="changedPostTitle"
                :rules="rule()"
                name="title"
                label="Change post title"
                outlined
                @click:append="showPass = !showPass"
              ></v-text-field>
              <v-btn
                class="change-post__button ms-1"
                rounded
                icon
                @click="showTitleInput = false"
              >
                <i class="fa-duotone fa-circle-xmark"></i>
              </v-btn>
            </div>
          </div>
          <div class="change-post__changing-text">
            <v-btn
              v-if="!showTextInput"
              class="default-button button-form-change"
              rounded
              @click="showTextInput = true"
              >Change text</v-btn
            >
            <div class="box" v-else>
              <v-text-field
                v-model="changedPostText"
                :rules="rule()"
                name="text"
                label="Change post text"
                outlined
              ></v-text-field>
              <v-btn
                class="change-post__button ms-1"
                rounded
                icon
                @click="showTextInput = false"
              >
                <i class="fa-duotone fa-circle-xmark"></i>
              </v-btn>
            </div>
          </div>
          <div class="change-post__changing-image">
            <v-btn
              v-if="!showImageInput"
              class="default-button button-form-change"
              rounded
              @click="showImageInput = true"
              >Change image</v-btn
            >
            <div class="box" v-else>
              <FormulateInput
                v-model="changedPostImage"
                @file-removed="changedPostImage = null"
                @file-upload-complete="fileUploaded = true"
                class="change-post__file-input"
                type="image"
                name="image"
                label="Post Image"
                validation="mime:image/jpeg,image/jpg,image/png"
                help="Download your image"
              />
              <v-btn
                class="change-post__button ms-1 file-input__button"
                rounded
                icon
                @click="showImageInput = false"
              >
                <i class="fa-duotone fa-circle-xmark"></i>
              </v-btn>
            </div>
          </div>

          <div class="change-post__changing-tags">
            <v-btn
              v-if="!showTagsInput"
              class="default-button button-form-change"
              rounded
              @click="showTagsInput = true"
              >Change tags</v-btn
            >
            <div class="box tags" v-else>
              <div class="change-post__tags-container py-2">
                <v-chip
                  class="mr-2"
                  v-for="(tag, index) in changedPostTags"
                  :key="index"
                  small
                  close
                  close-icon="mdi-delete"
                  @click:close="remove(tag)"
                  >{{ tag }}</v-chip
                >
              </div>
              <div class="change-post__button-tags-container">
                <VSelectTags
                  :placeholder="'Tags'"
                  class="button-tags"
                  :options="tags"
                  @add-tag="addTag"
                />
                <v-btn
                  class="change-post__button ms-1"
                  rounded
                  icon
                  @click="showTagsInput = false"
                >
                  <i class="fa-duotone fa-circle-xmark"></i>
                </v-btn>
              </div>
            </div>
          </div>
        </v-form>
        <div class="change-post__menu">
          <v-spacer></v-spacer>
          <v-btn
            class="default-button change-post__button disagree"
            rounded
            @click="closeModal"
          >
            Disagree
          </v-btn>
          <v-btn
            class="default-button change-post__button agree"
            type="submit"
            form="formChangePost"
            rounded
            :loading="loadingForm"
            :disabled="loadingForm"
          >
            Agree
          </v-btn>
        </div>
      </div>
      <Toast position="bottom-left" group="bmodalchange" />
    </v-card>
  </v-dialog>
</template>

<script>
import { SERVER_URL } from "@/constants";
import Toast from "primevue/toast/Toast";
import VSelectTags from "./VSelectTags.vue";
export default {
  components: { VSelectTags, Toast },

  props: {
    confirmDialog: Boolean,
    post: Object,
  },

  data() {
    return {
      showTitleInput: false,
      showTextInput: false,
      showImageInput: false,
      showTagsInput: false,
      changedPostTitle: "",
      changedPostText: "",
      changedPostImage: null,
      changedPostTags: [],
      tags: ["IT", "Film", "Sport", "Music"],
      valid: true,
      loadingForm: false,
      fileUploaded: false,
    };
  },

  computed: {
    setImage() {
      return `${SERVER_URL}${this.post.image}`;
    },
  },

  methods: {
    validate() {
      this.$refs.formChangePost.validate();

      if (this.showImageInput && !this.changedPostImage) {
        this.valid = false;
        return this.$toast.add({
          severity: "error",
          summary: "Submit",
          detail: "Please, load the image",
          group: "bmodalchange",
          life: 3000,
        });
      }
      if (this.showTagsInput && !this.changedPostTags.length) {
        this.valid = false;

        return this.$toast.add({
          severity: "error",
          summary: "Submit",
          detail: "Please, choose some tags",
          group: "bmodalchange",
          life: 3000,
        });
      }
      if (
        !this.showTitleInput &&
        !this.showTextInput &&
        !this.showImageInput &&
        !this.showTagsInput
      ) {
        this.valid = false;
        return this.$toast.add({
          severity: "warn",
          summary: "Submit",
          detail: "Please, choose options to update post",
          group: "bmodalchange",
          life: 3000,
        });
      }
    },

    addTag(event) {
      this.changedPostTags.push(event.value);
      this.changedPostTags = [...new Set(this.changedPostTags)];
    },

    remove(item) {
      this.changedPostTags.splice(this.changedPostTags.indexOf(item), 1);
    },

    closeModal() {
      this.changedPostTitle = "";
      this.changedPostText = "";
      this.changedPostImage = null;
      this.postFile = null;
      this.changedPostTags = [];
      this.$emit("close-dialog");
    },

    rule() {
      return [(v) => !!v || "Field cannot be empty."];
    },

    onSubmit(event) {
      event.preventDefault();

      this.validate();
      if (this.valid) {
        if (!this.fileUploaded) {
          return this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "File not uploaded yet",
            group: "bmodalchange",
            life: 3000,
          });
        }
        this.loadingForm = true;
        const form = this.$refs.formChangePost.$el;
        const formData = new FormData(form);
        if (this.changedPostTags.length) {
          formData.set("tags", this.changedPostTags);
        }
        const postId = this.post.id;
        this.$store
          .dispatch("fetchUpdatePost", { postId, formData })
          .then((res) => {
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: res,
              group: "bmodalchange",
              life: 3000,
            });
            setTimeout(() => {
              location.reload();
            }, 2000);
          })
          .catch((error) => {
            this.$toast.add({
              severity: "error",
              summary: "Error",
              detail: error,
              group: "bmodalchange",
              life: 3000,
            });
          })
          .finally(() => {
            this.loadingForm = false;
            this.fileUploaded = false;
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.change-post {
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;

  .v-card__title {
    font-family: "Rubik";
  }

  &__body {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 0 auto;
  }

  &__form {
    display: flex;
    flex-direction: column;
    .button-form-change {
      width: 100%;
      margin-top: 8px;
    }
  }

  &__file-input {
    width: 55%;
  }

  .box {
    display: flex;
    width: 100%;
    align-items: center;

    .change-post__button {
      position: relative;
      top: -16px;
    }
  }

  .file-input__button {
    position: relative;
    top: -10px !important;
  }

  .box.tags {
    display: block;
    button {
      top: 0;
    }
  }

  &__menu {
    padding-top: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    align-self: flex-end;
  }

  .button-tags::v-deep .p-dropdown-panel {
    top: -94px !important;
    left: 68px !important;
  }

  &__button {
    font-family: "Rubik";
  }

  .disagree {
    background: linear-gradient(0deg, rgb(255, 74, 74), rgb(255, 136, 136));
  }

  .agree {
    margin-left: 8px;
    background: linear-gradient(0deg, rgb(125, 255, 74), rgb(136, 255, 146));
  }
}
</style>

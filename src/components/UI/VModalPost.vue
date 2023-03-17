<template>
  <v-dialog
    :value="modalDialog"
    @click:outside="$emit('toggle-func')"
    width="1000"
  >
    <v-card class="post-card">
      <div class="post-card__wrapper">
        <div class="post-card__body">
          <div class="post-card__content">
            <div class="post-card__img">
              <v-img :src="setImage" />
            </div>
            <div class="post-card__info" ref="cardInfo">
              <div class="post-card__title">{{ post.title }}</div>
              <div class="post-card__text">
                {{ post.text }}
              </div>
            </div>
          </div>

          <div class="post-card__sidebar">
            <div class="post-card__comments-container">
              <template v-if="post.comments.length">
                <VPostComments
                  v-for="(comment, index) in post.comments"
                  :key="index"
                  :comment="comment"
                  :post="post"
                />
              </template>
              <template v-else>
                <div class="post-card__comments-empty">
                  <div>
                    <span>No comments. Comment it</span>
                    <img src="@/assets/doit.gif" />
                  </div>
                </div>
              </template>
            </div>
            <div class="post-card__comments-form-container">
              <v-form
                ref="form"
                class="post-card__comments-form"
                @submit.prevent="onSubmit"
              >
                <v-textarea
                  @keydown.enter="onSubmit"
                  outlined
                  rows="1"
                  dense
                  max-height="100px"
                  auto-grow
                  v-model="commentText"
                  class="post-card__comments-input"
                  name="comment"
                  label="Comment"
                ></v-textarea>
                <v-btn
                  ref="buttonComment"
                  class="post-card__comments-button"
                  type="submit"
                  rounded
                  icon
                  ><i class="fa-duotone fa-paper-plane-top"></i
                ></v-btn>
              </v-form>
            </div>
          </div>
        </div>
      </div>
      <Toast position="top-center" group="dialog" />
    </v-card>
  </v-dialog>
</template>

<script>
import { SERVER_URL } from "@/constants";
import Toast from "primevue/toast";
import VPostComments from "./comments/VPostComments.vue";

export default {
  components: {
    Toast,
    VPostComments,
  },

  props: {
    modalDialog: Boolean,
    post: Object,
  },

  data() {
    return {
      commentText: "",
    };
  },

  computed: {
    setImage() {
      return `${SERVER_URL}${this.post.image}`;
    },
  },

  methods: {
    onSubmit() {
      if (!this.commentText.trim().length) {
        return this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please, write a comment",
          group: "bl",
          life: 1800,
        });
      }

      this.loading = true;
      const form = this.$refs.form.$el;
      const formData = new FormData(form);
      this.$store
        .dispatch("fetchAddComment", {
          formData: formData,
          postId: this.post.id,
        })
        .then(() => {
          this.loading = false;
        })
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: error,
            group: "bl",
            life: 1800,
          });
        })
        .finally(() => (this.commentText = ""));
    },
  },
};
</script>

<style scoped lang="scss">
.post-card {
  font-family: "Rubik";
  height: 70vh;

  &__wrapper {
    height: 100%;
  }

  &__body {
    height: 100%;
    display: flex;
  }

  &__content {
    width: 70%;
    position: relative;
  }

  &__img {
    height: 100%;
    background: linear-gradient(
      0deg,
      rgb(82, 82, 82),
      rgb(161, 161, 161),
      rgb(82, 82, 82)
    );
    background-blend-mode: hard-light;
    position: relative;
    box-shadow: 0 0 8px #cd38ff;

    .v-image {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__info {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #4d4d4d;
    z-index: 11;
    color: #ffff;
    padding: 8px;
    max-height: 84px;
    overflow: hidden;
    transition: all 0.3s;
  }

  &__info:hover {
    max-height: 400px;
    overflow-y: auto;
  }

  &__info::-webkit-scrollbar {
    opacity: 0;
  }

  &__title {
    font-weight: bold;
  }

  &__text {
  }

  &__sidebar {
    height: 100%;
    width: 30%;
    display: flex;
    flex-direction: column;
  }

  &__comments-empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 8px #6aa5ff;
      padding: 8px;
      border-radius: 8px;
    }
    img {
      max-width: 100%;
    }
  }

  &__comments-container {
    flex-grow: 1;
    overflow: auto;
    padding: 8px;
  }

  &__comments-container::-webkit-scrollbar {
    opacity: 0;
    width: 4px;
  }

  &__comments-container::-webkit-scrollbar-thumb {
    display: block;
    border-radius: 10px;
    background-color: #6aa5ff;
  }

  &__comments-form-container {
    background-color: #dfdfdf;
    padding: 8px;
  }

  &__comments-form {
    display: flex;
  }

  &__comments-input::v-deep {
    margin: 0;
    padding: 0;

    .v-text-field__details {
      display: none;
    }

    textarea {
      max-height: 150px;
      overflow: auto;
      padding: 0;
      margin-right: 12px;
    }

    textarea::-webkit-scrollbar {
      opacity: 0;
      width: 4px;
    }

    textarea::-webkit-scrollbar-thumb {
      display: block;
      border-radius: 10px;
      background-color: #6aa5ff;
      padding: 8px 0;
    }
  }

  &__comments-button {
  }
}
</style>

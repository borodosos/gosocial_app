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
              <VPostComments
                v-for="(comment, index) in post.comments"
                :key="index"
                :comment="comment"
                :post="post"
              />
            </div>
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

  watch: {
    modalDialog() {
      if (this.modalDialog == true) {
        console.log("message");
      }
    },
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
          console.log(error);
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
    padding: 8px;
  }

  &__comments-container {
    flex-grow: 1;
  }

  &__comments-form {
    display: flex;
  }

  &__comments-input::v-deep {
    .v-text-field__details {
      display: none;
    }
  }

  &__comments-button {
  }
}
</style>

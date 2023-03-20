<template>
  <div class="comment-container">
    <div class="comment">
      <div class="comment__title">
        <v-avatar
          class="comment__user-avatar"
          :size="sizeAvatar || 45"
          color="purple darken-1"
        >
          <img :src="setImageProfile" alt="alt" />
        </v-avatar>
        <div class="comment__info">
          <span class="comment__user-name">
            {{ comment.user.first_name }} {{ comment.user.second_name }}
          </span>
          <span class="comment__data">{{ parseDate }}</span>
        </div>
      </div>
      <p v-if="!isMenuForChange" class="comment__text">
        {{ comment.text }}
      </p>
      <v-form
        v-else
        ref="form_editing"
        class="comment__form"
        id="form-change"
        @submit="onSubmitChange"
      >
        <FormulateInput
          :value="comment.text"
          @validation="valid = $event"
          resize="none"
          type="textarea"
          rows="3"
          class="comment__input-change"
          name="commentContent"
          validation="required"
        />
      </v-form>
      <div v-show="isAmI" class="comment__menu">
        <div class="comment__menu-buttons">
          <v-btn
            v-if="!isMenuForChange"
            icon
            small
            @click="isMenuForChange = true"
          >
            <v-icon size="18">mdi-pencil</v-icon>
          </v-btn>
          <div class="d-flex" v-else>
            <v-btn icon text small type="submit" form="form-change">
              <v-icon size="18">fa-check</v-icon>
            </v-btn>
            <v-btn icon text small @click="isMenuForChange = false">
              <v-icon size="18">fa-xmark</v-icon>
            </v-btn>
          </div>
          <v-btn icon text small type="submit" @click="deleteComment">
            <v-icon size="18">fa-trash</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <div v-show="comment.replies.length" class="comment__subcomments-container">
      <div class="comment__subcomments-wrapper">
        <VPostSubComments
          v-for="(reply, index) in comment.replies"
          :key="index"
          :reply="reply"
        />
      </div>
    </div>
    <div class="comment__menu-form mt-2">
      <span
        v-if="!showFormReply"
        class="comment__reply-text"
        @click="showFormReply = true"
        >Reply</span
      >
      <div v-else class="comment__form-container">
        <v-form ref="form" class="comment__form mt-2" @submit="onSubmit">
          <v-textarea
            @keydown.enter="onSubmit"
            outlined
            rows="1"
            dense
            max-height="100px"
            auto-grow
            v-model="replyText"
            class="comment__input"
            name="reply"
            label="Reply"
          ></v-textarea>
          <v-btn
            class="subcomment__button ms-1"
            rounded
            icon
            @click="hideReplyForm"
          >
            <i class="fa-duotone fa-circle-xmark"></i>
          </v-btn>
          <v-btn class="subcomment__button ms-1" type="submit" rounded icon>
            <i class="fa-duotone fa-paper-plane-top"></i>
          </v-btn>
        </v-form>
      </div>
    </div>
    <Toast position="bottom-left" group="bl" />
  </div>
</template>

<script>
import { SERVER_URL } from "@/constants";
import VPostSubComments from "./VPostSubComments.vue";
import Toast from "primevue/toast";

import moment from "moment";

export default {
  props: {
    user: Object,
    post: Object,
    comment: Object,
    sizeAvatar: Number,
  },

  components: {
    VPostSubComments,
    Toast,
  },

  data() {
    return {
      loading: false,
      replyText: "",
      isMenuForChange: false,
      valid: "",
      showFormReply: false,
    };
  },

  computed: {
    setImageProfile() {
      if (!this.comment.user.image_profile) {
        return require("@/assets/photos/defaultGiga.jpg");
      } else return `${SERVER_URL}${this.comment.user.image_profile}`;
    },

    parseDate() {
      return moment(this.comment.created_at).fromNow();
    },
    isAmI() {
      const userId = this.comment.user_id;
      const authUserId = this.$store.getters.getAuthUser.id;
      return userId === authUserId;
    },
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      if (!this.replyText.trim().length) {
        return this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please, write a reply",
          group: "bl",
          life: 1800,
        });
      }
      this.loading = true;
      const form = this.$refs.form.$el;
      const formData = new FormData(form);
      formData.append("commentId", this.comment.id);
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
        .finally(() => (this.replyText = ""));
    },

    onSubmitChange(event) {
      event.preventDefault();
      if (this.valid.hasErrors) {
        return;
      }
      this.loading = true;
      const form = this.$refs.form_editing.$el;
      const formData = new FormData(form);
      this.$store
        .dispatch("fetchUpdateComment", {
          formData: formData,
          commentId: this.comment.id,
        })
        .then((res) => {
          console.log(res);
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
        .finally(() => {
          this.isMenuForChange = false;
        });
    },

    hideReplyForm() {
      this.replyText = "";
      return (this.showFormReply = false);
    },

    deleteComment(event) {
      event.preventDefault();
      this.$store
        .dispatch("fetchDeleteComment", this.comment.id)
        .then((res) => {
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: res,
            group: "bl",
            life: 1800,
          });
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
        .finally(() => {
          this.isMenuForChange = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.comment-container {
  font-size: 0.9em;
  border-radius: 8px;
  padding: 8px;
}

.comment {
  &__title {
    display: flex;
    align-items: center;
  }

  &__user-avatar {
    margin-right: 4%;
  }

  &__user-name {
    font-weight: bold;
  }

  &__data {
    font-size: 0.85em;
    color: #8b8b8b;
  }

  &__body {
    padding-top: 4px;
  }

  &__text {
    padding-top: 4px;
  }

  &__input-change,
  &__input-change::v-deep .formulate-input-wrapper,
  &__input-change::v-deep .formulate-input-element {
    max-width: 100%;
    width: 100%;
  }

  &__input-change::v-deep textarea {
    font-family: "Rubik";
    margin: 4px 0;
    padding: 4px;
    font-size: 1em;
    resize: none;
  }

  &__menu {
    display: inline-flex;
    width: 100%;
  }

  &__menu-buttons {
    display: flex;
    align-items: center;
    background-color: #ffc8af;
    border-radius: 8px;
    margin-right: 8px;
    height: max-content;
  }

  &__menu-form {
    width: 100%;
    display: flex;
    align-items: center;
  }

  &__reply-text {
    color: #cd38ff;
    cursor: pointer;
    font-style: italic;

    &:hover {
      text-decoration: underline;
    }
  }

  &__form-container {
    width: 100%;
  }

  &__form {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__input {
    width: 100%;
    border-radius: 8px;
    margin: 0;
  }

  &__input::v-deep .v-text-field__details {
    display: none;
  }

  &__input::v-deep textarea {
    max-height: 150px;
    overflow: auto;
  }

  &__input::v-deep textarea::-webkit-scrollbar {
    opacity: 0;
    width: 4px;
  }

  &__input::v-deep textarea::-webkit-scrollbar-thumb {
    display: block;
    border-radius: 10px;
    background-color: #6aa5ff;
    padding: 8px 0;
  }

  &__input::v-deep .v-input__slot {
    margin: 0;
    min-height: 38px;
  }

  span {
    display: block;
  }

  &__subcomments-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border-radius: 8px;
    padding: 4px;
    padding-left: 28px;
    position: relative;
  }

  &__subcomments-container::before {
    content: "";
    display: block;
    position: absolute;
    left: 12px;
    height: 100%;
    width: 1px;
    background-color: rgb(155, 198, 255);
  }

  &__subcomments-wrapper {
    width: 100%;
  }

  &__subcomments-wrapper::-webkit-scrollbar {
    opacity: 0;
    width: 4px;
  }

  &__subcomments-wrapper::-webkit-scrollbar-thumb {
    display: block;
    border-radius: 10px;
    background-color: #6aa5ff;
  }

  .subcomment__button {
    padding: 0;
  }
}
</style>

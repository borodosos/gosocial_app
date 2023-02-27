<template>
  <div class="subcomment">
    <div class="subcomment__title">
      <v-avatar
        class="subcomment__user-avatar"
        size="40"
        color="purple darken-1"
      >
        <img :src="setImageProfile" alt="alt" />
      </v-avatar>
      <div class="subcomment__info">
        <span class="subcomment__user-name">
          {{ reply.user.first_name }} {{ reply.user.second_name }}
        </span>
        <span class="subcomment__data">{{ parseDate }} </span>
      </div>
    </div>
    <p v-if="!isMenuForChange" class="subcomment__text">
      {{ reply.text }}
    </p>
    <v-form
      v-else
      ref="replyForm"
      class="subcomment__form"
      id="form-change-reply"
      @submit="onSubmitChangeReply"
    >
      <FormulateInput
        :value="reply.text"
        @validation="valid = $event"
        resize="none"
        type="textarea"
        rows="3"
        class="subcomment__input-change"
        name="replyContent"
        validation="required"
      />
    </v-form>
    <div v-show="isAmI" class="subcomment__menu">
      <v-btn v-if="!isMenuForChange" icon small @click="isMenuForChange = true">
        <v-icon size="18">mdi-pencil</v-icon>
      </v-btn>
      <div v-else>
        <v-btn icon text small type="submit" form="form-change-reply">
          <v-icon size="18">fa-check</v-icon>
        </v-btn>
        <v-btn icon text small @click="isMenuForChange = false">
          <v-icon size="18">fa-xmark</v-icon>
        </v-btn>
      </div>
      <v-btn icon text small type="submit" @click="deleteCommentReply">
        <v-icon size="18">fa-trash</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { SERVER_URL } from "@/constants";
import moment from "moment";

export default {
  props: {
    user: Object,
    post: Object,
    reply: Object,
  },

  data() {
    return {
      isMenuForChange: false,
      valid: "",
    };
  },

  computed: {
    setImageProfile() {
      if (!this.reply.user.image_profile) {
        return require("@/assets/photos/defaultGiga.jpg");
      } else return `${SERVER_URL}${this.reply.user.image_profile}`;
    },

    parseDate() {
      return moment(this.reply.created_at).fromNow();
    },
    isAmI() {
      const userId = this.reply.user_id;
      const authUserId = this.$store.getters.getAuthUser.id;
      return userId === authUserId;
    },
  },

  methods: {
    onSubmitChangeReply(event) {
      event.preventDefault();
      if (this.valid.hasErrors) {
        return;
      }
      this.loading = true;
      const form = this.$refs.replyForm.$el;
      const formData = new FormData(form);
      this.$store
        .dispatch("fetchUpdateComment", {
          formData: formData,
          commentId: this.reply.id,
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
        .finally(() => {
          this.isMenuForChange = false;
        });
    },

    deleteCommentReply(event) {
      event.preventDefault();
      this.$store
        .dispatch("fetchDeleteComment", this.reply.id)
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
.subcomment {
  padding-top: 8px;
  word-break: break-word;
  width: 95%;
  font-size: 0.95em;

  &__body {
    padding-top: 4px;
  }

  &__title {
    display: flex;
    align-items: center;
  }

  &__user-avatar {
    margin-right: 4%;
  }

  &__info {
  }

  &__user-name {
    font-weight: bold;
  }

  &__data {
    font-size: 0.85em;
    color: #8b8b8b;
  }

  &__text {
    padding-top: 8px;
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
    display: inline-block;
    background-color: #ffc8af;
    border-radius: 8px;
    margin-bottom: 4px;
    display: inline-flex;
    align-items: center;
  }

  span {
    display: block;
  }
}
</style>

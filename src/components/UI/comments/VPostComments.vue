<template>
  <div class="comment-container">
    <div class="comment">
      <div class="comment__title">
        <v-avatar
          class="comment__user-avatar"
          size="45"
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
      <p class="comment__text">
        {{ comment.text }}
      </p>
    </div>
    <div v-show="comment.replies.length" class="comment__subcomments-container">
      <VPostSubComments
        v-for="(reply, index) in comment.replies"
        :key="index"
        :reply="reply"
      />
    </div>
    <div class="comment__form-container">
      <v-form
        ref="form"
        v-model="valid"
        class="comment__form"
        @submit="onSubmit"
      >
        <InputText
          v-model="replyText"
          class="comment__input"
          name="reply"
          label="Reply"
          placeholder="Reply..."
        ></InputText>
        <v-btn class="default-button subcomment__button" type="submit" rounded
          >Reply</v-btn
        >
      </v-form>
    </div>
  </div>
</template>

<script>
import { SERVER_URL } from "@/constants";
import VPostSubComments from "./VPostSubComments.vue";
import InputText from "primevue/inputtext/InputText";

export default {
  props: {
    user: Object,
    post: Object,
    comment: Object,
  },

  data() {
    return {
      loading: false,
      valid: true,
      replyText: "",
    };
  },

  components: {
    VPostSubComments,
    InputText,
  },

  computed: {
    setImageProfile() {
      if (!this.comment.user.image_profile) {
        return require("@/assets/photos/defaultGiga.jpg");
      } else return `${SERVER_URL}${this.comment.user.image_profile}`;
    },

    parseDate() {
      const addDate = this.comment.created_at;
      const currentDate = Date.parse(new Date());
      const time = (currentDate - Date.parse(addDate)) / 1440;

      return time;
    },
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },

    onSubmit(event) {
      event.preventDefault();
      this.validate();
      if (this.valid) {
        this.loading = true;
        const form = this.$refs.form.$el;
        const formData = new FormData(form);
        formData.append("commentId", this.comment.id);
        this.$store
          .dispatch("fetchAddComment", {
            formData: formData,
            postId: this.post.id,
          })
          .then((res) => {
            this.loading = false;
            console.log(res);
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.comment-container {
  font-size: 0.9em;
  border: 1px solid #acacac;
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

  &__info {
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
    padding-top: 8px;
  }

  span {
    display: block;
  }

  &__subcomments-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-height: 307px;
    overflow-y: auto;
    border-radius: 8px;
    box-shadow: inset 0 0 8px #6aa5ff;
    padding: 8px 0;
  }

  &__subcomments-container::-webkit-scrollbar {
    opacity: 0;
    width: 4px;
  }

  &__subcomments-container::-webkit-scrollbar-thumb {
    display: block;
    border-radius: 10px;
    background-color: #6aa5ff;
  }

  &__form-container {
    background-color: #e5e5e5;
    padding: 8px 12px 8px;
    margin-top: 8px;
  }

  &__form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__input {
    width: 70%;
    padding: 4px;
    border-radius: 16px;
  }
}
</style>

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
            {{ user.first_name }} {{ user.second_name }}
          </span>
          <span class="comment__data">Just Now</span>
        </div>
      </div>
      <p class="comment__text">
        Aboba aboba aboba Aboba aboba aboba Aboba aboba aboba Aboba aboba aboba
        Aboba aboba aboba Aboba aboba aboba
      </p>
    </div>
    <div class="comment__subcomments-container">
      <VPostSubComments
        v-for="(item, index) in [1, 2, 3, 4]"
        :key="index"
        :user="user"
        :post="post"
      />
    </div>
    <div class="comment__form-container">
      <v-form ref="form" class="comment__form">
        <InputText
          class="comment__input"
          name="subcomment"
          label="Subcomment"
          placeholder="Reply..."
        ></InputText>
        <v-btn class="default-button subcomment__button" rounded>Reply</v-btn>
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
  },

  components: {
    VPostSubComments,
    InputText,
  },

  computed: {
    setImageProfile() {
      if (!this.user.image_profile) {
        return require("@/assets/photos/defaultGiga.jpg");
      } else return `${SERVER_URL}${this.user.image_profile}`;
    },
  },
};
</script>

<style scoped lang="scss">
.comment-container {
  font-size: 0.9em;
  border: 1px solid #cccccc;
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
  }

  &__form-container {
    background-color: #e5e5e5;
    padding: 8px 12px 8px;
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

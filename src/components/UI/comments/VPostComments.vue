<template>
  <div class="comment">
    <div class="comment__body">
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
      <div class="comment__text">
        Aboba aboba aboba Aboba aboba aboba Aboba aboba aboba Aboba aboba aboba
        Aboba aboba aboba Aboba aboba aboba
      </div>
    </div>
    <VPostSubComments />
  </div>
</template>

<script>
import { SERVER_URL } from "@/constants";
import VPostSubComments from "./VPostSubComments.vue";
export default {
  props: {
    user: Object,
    post: Object,
  },

  components: {
    VPostSubComments,
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
.comment {
  font-size: 0.9em;
  border: 1px solid #cccccc;
  border-radius: 8px;
  padding: 8px;

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
}
</style>

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
        <span class="subcomment__data">Just Now</span>
      </div>
    </div>
    <p class="subcomment__text">
      {{ reply.text }}
    </p>
  </div>
</template>

<script>
import { SERVER_URL } from "@/constants";

export default {
  props: {
    user: Object,
    post: Object,
    reply: Object,
  },

  computed: {
    setImageProfile() {
      if (!this.reply.user.image_profile) {
        return require("@/assets/photos/defaultGiga.jpg");
      } else return `${SERVER_URL}${this.reply.user.image_profile}`;
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

  span {
    display: block;
  }
}
</style>

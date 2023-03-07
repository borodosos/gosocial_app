<template>
  <div class="message" :class="{ ['my-message']: isAmI }">
    <div class="message__wrapper">
      <div class="message__header">
        <v-avatar
          class="message__header-avatar"
          size="45"
          color="purple darken-1"
        >
          <!-- <img :src="setImageProfile" alt="alt" /> -->
        </v-avatar>
        <div class="message__header-content">
          <span class="message__user-name">
            {{ dataMessage.user.first_name }} {{ dataMessage.user.second_name }}
          </span>
          <span class="message__data">
            {{ parseDate }}
          </span>
        </div>
      </div>
      <div class="message__body">
        {{ dataMessage.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataMessage: Object,
  },

  computed: {
    isAmI() {
      return this.dataMessage.user_id === this.$store.getters.getAuthUser.id;
    },

    parseDate() {
      const date = new Date(this.dataMessage.created_at);
      const myOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return date.toLocaleString("en-US", myOptions);
    },
  },
};
</script>

<style scoped lang="scss">
.message + .message {
  margin-top: 16px;
}

.message {
  font-family: "Rubik";
  background-color: rgb(235, 235, 235);
  border-radius: 8px;
  width: 70%;
  box-shadow: 0 0 8px rgb(173, 173, 173);

  &__wrapper {
    padding: 8px;
  }

  &__header {
    display: flex;
  }

  &__header-avatar {
    cursor: pointer;
  }

  &__header-content {
    padding-left: 8px;
    display: flex;
    flex-direction: column;
  }

  &__user-name {
    font-weight: bold;
    cursor: pointer;
  }

  &__data {
    color: #8b8b8b;
    font-size: 0.8em;
  }

  &__body {
    padding-top: 4px;
    word-break: break-word;
  }
}

.my-message {
  align-self: flex-end;
  background-color: rgb(185, 229, 255);
}
</style>

<template>
  <v-btn
    rounded
    class="chat__sidebar-button"
    @click="$emit('click-to-chat', user.id)"
  >
    <v-avatar size="32" color="indigo lighten-1 mr-1">
      <img
        lazy-src="../assets/photos/defaultGiga.jpg"
        :src="setImageProfile"
        alt="alt"
      />
    </v-avatar>
    {{ user.first_name }} {{ user.second_name }}
  </v-btn>
</template>

<script>
export default {
  props: {
    user: Object,
  },

  computed: {
    setImageProfile() {
      if (!this.user.image_profile) {
        return require("@/assets/photos/defaultGiga.jpg");
      } else
        return `${process.env.VUE_APP_SERVER_URL}${this.user.image_profile}`;
    },
  },
};
</script>

<style scoped lang="scss">
.chat {
  &__sidebar-button.v-btn::v-deep {
    width: 100%;
    font-size: 0.8em;
    padding: 0;
    height: 42px;

    .v-btn__content {
      width: 100%;
      height: 100%;
      justify-content: start;
      padding: 0 8px;
      white-space: initial;
    }
  }
}
</style>

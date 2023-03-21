<template>
  <v-btn
    rounded
    class="chat__sidebar-button"
    @click="$emit('click-to-chat', user)"
  >
    <v-avatar size="32" color="indigo lighten-1 mr-1">
      <img :src="setImageProfile" alt="alt" />
    </v-avatar>
    <span class="chat__button-text"
      >{{ user.first_name }} {{ user.second_name }}</span
    >
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
.chat__button-text {
  width: 100%;
}
</style>

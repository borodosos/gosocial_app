<template>
  <div class="chat__sidebar">
    <div class="chat__sidebar-title">Friends list</div>
    <div class="chat__sidebar-wrapper">
      <ul class="chat__sidebar-list">
        <template v-if="users.length">
          <li
            class="chat__sidebar-list-component"
            v-for="(user, index) in users"
            v-show="user.id !== $store.getters.getAuthUser.id"
            :key="index"
          >
            <VChatSidebarUser
              :user="user"
              @click-to-chat="$emit('clicked-to-user', user)"
            />
          </li>
        </template>
        <template v-else>
          <VChatLoader />
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import VChatLoader from "./VChatLoader.vue";
import VChatSidebarUser from "./VChatSidebarUser.vue";

export default {
  components: { VChatSidebarUser, VChatLoader },

  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.$store.dispatch("fetchAllUsers").then((value) => {
      this.users = value;
    });
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.chat {
  &__sidebar {
    padding: 4px 8px 8px 8px;
    border-radius: 8px;
    width: 25%;
    min-width: 165px;
    box-shadow: 0 0 8px #6aa5ff;
    background: linear-gradient(0deg, rgb(149, 255, 255), rgb(68, 186, 255));
  }

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

  &__sidebar-wrapper {
    padding-top: 8px;
  }

  &__sidebar-title {
    font-size: 1.4em;
    font-weight: bold;
    border-bottom: solid 1px rgb(206, 206, 206);
  }

  &__sidebar-list::v-deep {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__sidebar-list-component + &__sidebar-list-component {
    padding-top: 8px;
  }
}
</style>

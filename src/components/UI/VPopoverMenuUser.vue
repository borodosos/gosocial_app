<template>
  <v-menu v-model="menu" open-on-hover :close-on-content-click="true" offset-x>
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="!isAmI ? attrs : null" v-on="!isAmI ? on : null">
        <VHighlightedText
          v-if="storeFilter === 'Authors' || 'All'"
          :text="`${user.first_name} ${user.second_name}`"
        />
        <span v-else> {{ user.first_name }} {{ user.second_name }} </span>
      </div>
    </template>

    <div class="menu">
      <div class="menu__wrapper">
        <router-link
          class="menu__link"
          :to="'chat/' + this.$store.getters.getAuthUser?.id"
          >Go to chat</router-link
        >
      </div>
    </div>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";
import VHighlightedText from "./VHighlightedText.vue";

export default {
  components: { VHighlightedText },

  props: {
    user: Object,
  },

  data: () => ({
    menu: false,
  }),

  computed: {
    ...mapGetters({
      storeFilter: "getFilter",
    }),

    isAmI() {
      const userId = this.user.id;
      const authUserId = this.$store.getters.getAuthUser.id;
      return userId === authUserId;
    },
  },
};
</script>

<style scoped lang="scss">
.menu {
  font-family: "Rubik";
  font-size: 14px;

  &__wrapper {
    background: white;
    padding: 8px;
  }

  &__link {
    padding: 4px;
    border-radius: 4px;
    display: block;
    width: 100%;
    text-decoration: none;
    color: black;
  }

  &__link:hover {
    background-color: rgb(197, 197, 197);
  }
}
</style>

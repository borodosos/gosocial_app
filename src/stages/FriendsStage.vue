<template>
  <section class="friends panel">
    <div class="friends__header">
      <div class="friends__title">Friends list</div>
    </div>
    <v-divider class="my-2"></v-divider>
    <div class="friends__list">
      <ul class="friends__list-wrapper">
        <li
          class="friends__list-component"
          v-for="(friend, index) in friends"
          :key="index"
          @click="route"
        >
          <v-avatar size="32" color="indigo lighten-1 mr-1" @click="route">
            <img :src="setImageProfile" alt="alt" />
          </v-avatar>
          {{ friend.first_name }} {{ friend.second_name }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { SERVER_URL } from "@/constants";

export default {
  data() {
    return {
      friends: [1, 2, 3, 4],
      marginBottomIntersecting: `-${window.innerHeight - 55}`,
      user: this.$store.getters.getAuthUser,
    };
  },
  methods: {
    showPanel(entries) {
      entries.forEach((entry) => {
        const panel = entry.target;
        if (entry.isIntersecting) {
          panel.style.opacity = "1";
          panel.style.padding = "20px";
          panel.style.zIndex = "1";
        } else {
          panel.style.opacity = "0";
          panel.style.padding = "0";
          panel.style.zIndex = "-1";
        }
      });
    },

    route() {
      this.$router.push("/chat");
    },
  },

  computed: {
    setImageProfile() {
      if (!this.user.image_profile) {
        return require("@/assets/photos/defaultGiga.jpg");
      } else return `${SERVER_URL}${this.user.image_profile}`;
    },
  },

  mounted() {
    const options = {
      root: null,
      rootMargin: `0px 0px ${this.marginBottomIntersecting}px 0px`,
      threshold: 0,
    };
    const observer = new IntersectionObserver(this.showPanel, options);
    observer.observe(document.querySelector(".friends"));

    this.$store
      .dispatch("fetchAllUsers")
      .then((value) => (this.friends = value));
  },
};
</script>

<style scoped lang="scss">
.friends {
  height: max-content;
  position: sticky;
  top: 15px;
  opacity: 1;
  transition: all 0.2s;
  min-width: 255px;

  &__header {
    display: flex;
    align-items: center;
  }

  &__title {
    font-weight: bold;
  }

  &__list {
    list-style: none;
    padding: 0;
  }

  &__list-wrapper {
    list-style: none;
    padding: 0;
  }

  &__list-component {
    padding: 4px 8px;
    cursor: pointer;
    border-radius: 4px;
  }

  &__list-component:hover {
    background-color: rgb(224, 224, 224);
  }
}
</style>

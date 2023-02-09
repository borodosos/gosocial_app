<template>
  <section class="user panel">
    <div class="user__header">
      <v-avatar size="50" color="indigo lighten-1" @click="route">
        <img :src="setImageProfile" alt="alt" />
      </v-avatar>
      <div class="user__title">
        <span class="user__name"
          >{{ user.first_name }} {{ user.second_name }}</span
        >
      </div>
      <router-link class="ms-auto user__link" :to="'/users/' + user.id">
        <button class="user__button-settings">
          <i class="fa-solid fa-gear"></i>
          <i class="fa-solid fa-gear"></i>
        </button>
      </router-link>
    </div>
    <div class="user__info">
      <div class="user__info-wrapper">
        <div class="user__place">
          <div class="user__icon">
            <i class="fa-duotone fa-location-dot"></i>
          </div>
          <span>Taganrog</span>
        </div>
        <div class="user__status">
          <div class="user__icon">
            <i class="fa-duotone fa-briefcase-blank"></i>
          </div>
          <span>User</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { SERVER_URL } from "@/constants";

export default {
  data() {
    return {
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
      this.$router.push(`/users/${this.user.id}`);
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
    observer.observe(document.querySelector(".user"));
  },
};
</script>

<style scoped>
.user {
  height: max-content;
  position: sticky;
  top: 15px;
  opacity: 0;
  transition: all 0.2s;
}

.user__link {
  color: unset;
}

.user__button-settings {
  padding: 16px;
  border-radius: 50%;
  display: block;
  position: relative;
  transition: all 0.4s;
}

.user__button-settings i {
  transition: all 0.1s ease;
  position: absolute;
  font-size: 12px;
  transform-origin: 50% 50%;
}

.user__button-settings i:nth-child(1) {
  top: 6px;
  left: 5px;
}

.user__button-settings i:nth-child(2) {
  bottom: 6px;
  right: 5px;
}

.user__button-settings:hover {
  background-color: rgb(235, 235, 235);
  box-shadow: 0 0 10px 5px rgb(243, 243, 243);
  transform: scale(1.1);
}

.user__button-settings:hover i {
  animation: rotateGear 2s linear infinite;
}

@keyframes rotateGear {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.user__header {
  display: flex;
  align-items: center;
}

.user__title {
  margin-left: 5%;
}

.user__name {
  font-weight: bold;
}

.user__friends {
  color: gray;
  font-size: 0.8em;
}

.user__info {
  padding: 10px 0;
  font-size: 0.85em;
}

.user__info::before {
  margin: 0 auto;
  margin-bottom: 10px;
  display: block;
  content: "";
  width: 100%;
  height: 1px;
  background-color: rgb(219, 219, 219);
}

.user__info-wrapper {
  display: flex;
  height: 60px;
  padding: 0 10px;
  flex-direction: column;
  justify-content: space-between;
}

.user__info-wrapper span {
  color: rgb(139, 139, 139);
}

.user__links {
  font-size: 0.85em;
}

.user__place,
.user__status {
  display: flex;
  align-items: center;
}

.user__icon {
  margin-right: 5%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
}
</style>

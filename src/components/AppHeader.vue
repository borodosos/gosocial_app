<template>
  <header class="header">
    <div class="header__wrapper">
      <router-link :to="'/'">
        <h1 class="header__title">GoSocial</h1>
      </router-link>
      <div class="header__menu">
        <nav class="header__navigation">
          <v-btn class="button-navigation" rounded>
            <router-link to="/">Home</router-link>
          </v-btn>
          <v-btn class="button-navigation" rounded>
            <router-link :to="'/users/' + this.$store.getters.getAuthUser?.id"
              >My Profile</router-link
            >
          </v-btn>
          <v-btn class="button-navigation" rounded>
            <router-link :to="'/chats/1'">Chats</router-link>
          </v-btn>
        </nav>
        <InputText
          v-debounce:300ms="search"
          v-model="keywords"
          class="header__input"
          id="username"
          type="text"
          placeholder="Search"
          :disabled="disableSearchForm"
        />
        <Dropdown
          class="custom-select"
          v-model="selectedFilter"
          optionLabel="name"
          :options="filters"
          placeholder="Filter"
          :disabled="disableSearchForm"
        />
      </div>
      <v-btn class="button-icon-menu" rounded @click="logout">
        <i class="fa-duotone fa-person-from-portal"></i>
        <span>Log out</span>
      </v-btn>
    </div>
  </header>
</template>

<script>
import InputText from "primevue/inputtext/InputText";
import Dropdown from "primevue/dropdown";

export default {
  components: {
    InputText,
    Dropdown,
  },

  data() {
    return {
      keywords: null,
      results: [],
      selectedFilter: { name: "All" },
      filters: [{ name: "All" }, { name: "Authors" }, { name: "Tags" }],
    };
  },

  watch: {
    selectedFilter() {
      this.search();
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("userLogoutFetch").then(() => {
        this.$router.push("/login");
      });
    },

    search() {
      this.$store
        .dispatch("fetchSearchPosts", {
          keywords: this.keywords,
          selectedFilter: this.selectedFilter.name,
        })
        .then((value) => {
          this.results = value;
        });
    },
  },

  computed: {
    disableSearchForm() {
      return this.$route.fullPath.includes("/users/");
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rowdies:wght@300&display=swap");

.header {
  position: relative;
  z-index: 10;
  padding: 15px;
  width: 80%;
  margin: 0 auto;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: white;
  box-shadow: 0 0 10px 0px #ff6060;
  background-image: url("@/assets/headerback_2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 45%;
  background-position-y: 66%;
}

.header__navigation {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 25%;
  margin: 0 auto;
}

.button-navigation.v-btn {
  padding: 0;
}

.button-navigation {
  display: block;
  margin: 0 4px;
}

.button-navigation::before {
  background: linear-gradient(
    45deg,
    #13dcff,
    #8fff72,
    #d893ff,
    #0fe4f3,
    #12f1cc,
    #0f35ef,
    #7c13ef,
    #ef13bf,
    #de0d0d
  );
  position: absolute;
  background-size: 400%;
  z-index: 1;
  filter: blur(5px);
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: glowing 5s linear infinite;
  transition: all 0.4s;
  border-radius: 12px;
}

.button-navigation:hover::before {
  opacity: 0.5;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 100% 0;
  }

  100% {
    background-position: 0 0;
  }
}

.button-navigation a {
  text-decoration: none;
  color: indigo;
  padding: 8px 20px;
}

.header__search {
  display: flex;
  width: 50%;
  align-items: center;
  margin: 0 auto 0 4%;
}

.header__input {
  border-radius: 20px;
  width: 40%;
}

.custom-select {
  margin: 0 auto 0 16px;
}

.header__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  padding: 12px;
  box-shadow: inset 0 0 15px 5px rgba(255, 255, 255, 0.5);
}

.header__title {
  font-family: "Rowdies", cursive;
  letter-spacing: 3px;
  padding: 0;
  color: aqua;
  text-shadow: 0 0 2px rgb(0, 0, 0);
  -webkit-text-stroke: 1px rgb(0, 0, 0);
}

.header__menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.button-icon-menu {
  width: 38px;
  transition: all 0.4s;
}

.button-icon-menu.v-btn.v-size--default {
  min-width: 1px;
}

.button-icon-menu.v-btn span {
  width: 0;
  overflow: hidden;
  transition: all 0.4s;
}

.button-icon-menu.v-btn:hover {
  transform: scale(1.1);
  box-shadow: 0px 5px 12px 0px rgb(180, 180, 180);
  width: 120px;
}

.button-icon-menu.v-btn:hover span {
  width: 80px;
}

.button-icon-menu.v-btn i {
  transition: all 0.6s;
}

.button-icon-menu.v-btn:hover i {
  transform: rotate(360deg);
}
</style>

<template>
  <v-app>
    <AppHeader v-show="this.$store.getters.isAuthenticated" />
    <router-view />
    <Toast position="bottom-left" group="bnotification" />
  </v-app>
</template>

<script>
import "@/components/UI/particles/particles";
import Toast from "primevue/toast/Toast";
import { mapGetters } from "vuex";

import AppHeader from "./components/AppHeader.vue";

export default {
  components: { AppHeader, Toast },
  data: () => ({
    //
  }),

  computed: {
    ...mapGetters({
      notification: "getNotification",
    }),
  },

  watch: {
    notification() {
      if (this.$route.name !== "Chat") {
        this.$toast.add({
          severity: "info",
          detail: this.notification.message,
          group: "bnotification",
          life: 3000,
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@import "../node_modules/@braid/vue-formulate/themes/snow/snow.scss";
@import url("@/assets/fontawesome/css/all.css");

a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

a.router-link-exact-active {
  color: #42b983;
}

.v-application--wrap {
  position: absolute;
  width: 100%;
  background-image: url("@/assets/appback.jpg");
  background-size: cover;
  background-attachment: fixed;
}

canvas.particles {
  position: fixed;
  height: 100%;
  width: 100%;
}

.v-btn i {
  color: initial;
  text-indent: 0;
}

i {
  font-size: 24px;
}

.v-application p {
  padding: 0;
  margin: 0;
}

.v-avatar {
  border: solid 1px black;
  cursor: pointer;
}

.v-avatar img {
  object-fit: cover;
}

.custom-select.p-dropdown {
  position: relative;
  display: inline-flex;
  height: 36px;
  min-width: 64px;
  text-align: center;
  font-family: "Rubik", sans-serif;
  border: none;
  border-radius: 50px;
  padding: 0 12px;
  text-transform: none;
  font-weight: normal;
  background: linear-gradient(0deg, rgb(158, 160, 255), rgb(253, 239, 239));
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
}

.custom-select .p-dropdown-trigger {
  display: none !important;
}

.custom-select span {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-select.p-dropdown .p-dropdown-label.p-placeholder {
  font-family: "Rubik";
  color: #464646;
  font-size: 0.9em;
}

.custom-select.p-dropdown .p-dropdown-item {
  text-align: start;
}

.custom-select.p-dropdown .p-dropdown-items-wrapper::-webkit-scrollbar {
  opacity: 0;
  width: 4px;
}

.custom-select.p-dropdown .p-dropdown-items-wrapper::-webkit-scrollbar-thumb {
  display: block;
  border-radius: 10px;
  background-color: black;
}

.default-button {
  background: linear-gradient(0deg, rgb(158, 160, 255), rgb(253, 239, 239));
  color: rgb(70, 70, 70);
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>

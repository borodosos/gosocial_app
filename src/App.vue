<template>
  <v-app>
    <AppHeader />
    <router-view />
  </v-app>
</template>

<script>
import "@/components/UI/particles/particles";
import AppHeader from "./components/AppHeader.vue";

export default {
  components: { AppHeader },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@import "../node_modules/@braid/vue-formulate/themes/snow/snow.scss";
@import url("@/assets/fontawesome/css/all.css");

a {
  font-weight: bold;
  color: #2c3e50;
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

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>

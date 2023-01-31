import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegistrationPage from "@/pages/RegistrationPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/users",
    component: ProfilePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/registration",
    component: RegistrationPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

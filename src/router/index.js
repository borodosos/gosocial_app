import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";

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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

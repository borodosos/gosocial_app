import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import ChatPage from "@/pages/ChatPage.vue";
import RegistrationPage from "@/pages/RegistrationPage.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HomePage,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/users/:id",
    component: ProfilePage,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/chat",
    component: ChatPage,
    meta: {
      requiresAuth: true,
    },
    name: "Chat",
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      return next();
    } else {
      store
        .dispatch("refreshTokenFetch")
        .then(() => {
          return next();
        })
        .catch(() => {
          return next("/login");
        });
    }
  } else {
    next();
  }
});

export default router;

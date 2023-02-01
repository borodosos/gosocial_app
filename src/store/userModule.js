import { fetchUserPosts } from "@/http/userApi";

export default {
  state: {
    user: null,
    userPosts: null,
  },

  actions: {
    initUser(ctx, payload) {
      ctx.commit("updateUser", payload);
    },

    async fetchUserPosts() {
      fetchUserPosts();
    },
  },

  mutations: {
    updateUser(state, payload) {
      state.user = payload;
    },
  },

  getters: {
    getUser(state) {
      return state.user;
    },
  },
};

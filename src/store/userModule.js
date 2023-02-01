import parseToken from "@/utils/parseToken";

export default {
  state: {
    user: null,
    userPosts: null,
  },

  actions: {
    initUser(ctx, token) {
      const parsedToken = parseToken(token);
      const userInfo = parsedToken.user_info;
      return new Promise((resolve) => {
        ctx.commit("updateUser", userInfo);
        resolve();
      });
    },

    // async fetchUserPosts() {
    //   fetchUserPosts();
    // },
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

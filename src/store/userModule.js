export default {
  state: {
    user: null,
    userPosts: null,
  },

  actions: {
    initUser(ctx, userDetails) {
      return new Promise((resolve) => {
        ctx.commit("updateUser", userDetails);
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

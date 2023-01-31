export default {
  state: {
    user: null,
  },

  actions: {
    initUser(ctx, payload) {
      ctx.commit("updateUser", payload);
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

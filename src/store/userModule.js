import axios from "axios";

export default {
  state: {
    user: null,
    userPosts: null,
  },

  actions: {
    initUser(ctx, payload) {
      ctx.commit("updateUser", payload);
    },

    fetchUserPosts() {
      axios({
        url: `${process.env.VUE_APP_SERVER_URL}api/users`,
        method: "get",
      });
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

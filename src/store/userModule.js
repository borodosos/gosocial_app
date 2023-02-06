import { getUserInfo } from "@/http/userApi";

export default {
  state: {
    user: null,
    authUser: null,
  },

  actions: {
    initUser(ctx, userDetails) {
      return new Promise((resolve) => {
        ctx.commit("updateAuthUser", userDetails);
        resolve();
      });
    },

    fetchUserInfo(ctx, paramsId) {
      return new Promise((resolve, reject) => {
        getUserInfo(paramsId)
          .then((res) => {
            ctx.commit("updateUser", res);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },

  mutations: {
    updateUser(state, payload) {
      state.user = payload;
    },
    updateAuthUser(state, payload) {
      state.authUser = payload;
    },
  },

  getters: {
    getUser(state) {
      return state.user;
    },
    getAuthUser(state) {
      return state.authUser;
    },
  },
};

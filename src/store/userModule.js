import { getUserInfo } from "@/http/userApi";

export default {
  state: {
    user: null,
    authUser: null,
  },

  actions: {
    initUser(ctx, userDetails) {
      return new Promise((resolve) => {
        console.log(userDetails);
        ctx.commit("updateAuthUser", userDetails);
        resolve();
      });
    },

    async fetchUserInfo(ctx, paramsId) {
      return new Promise((resolve, reject) => {
        getUserInfo(paramsId)
          .then((res) => {
            // console.log("res: ", res);
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

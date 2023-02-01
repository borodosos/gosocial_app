import { getUserInfo } from "@/http/userApi";

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

    async fetchUserInfo(ctx, paramsId) {
      return new Promise((resolve, reject) => {
        getUserInfo(paramsId)
          .then((res) => {
            console.log("res: ", res);
            ctx.commit("updateUserPosts", res);
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
    updateUserPosts(state, payload) {
      state.userPosts = payload;
    },
  },

  getters: {
    getUser(state) {
      return state.user;
    },
    getUserPosts(state) {
      return state.userPosts;
    },
  },
};

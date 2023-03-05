import { getUserInfo, updateUserInfo, getAllUsers } from "@/http/userApi";

export default {
  state: {
    user: null,
    authUser: null,
    users: [],
  },

  actions: {
    initUser(ctx, userDetails) {
      return new Promise((resolve) => {
        ctx.commit("updateAuthUser", userDetails);
        resolve();
      });
    },

    fetchAllUsers(ctx) {
      return new Promise((resolve, reject) => {
        getAllUsers()
          .then((res) => {
            ctx.commit("updateAllUsers", res);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
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

    fetchUpdateUserInfo(ctx, payload) {
      return new Promise((resolve, reject) => {
        updateUserInfo(payload.urlId, payload.formData)
          .then((res) => {
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
    updateAllUsers(state) {
      state.users = state;
    },
  },

  getters: {
    getUser(state) {
      return state.user;
    },
    getAuthUser(state) {
      return state.authUser;
    },
    getAllUsers(state) {
      return state.users;
    },
  },
};

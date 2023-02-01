import { login, refresh, registration } from "@/http/userApi";
import Cookies from "js-cookie";

export default {
  state: {
    token: "",
  },

  actions: {
    // === Registration fetch user
    async userRegisterFetch(ctx, payload) {
      return new Promise((resolve, reject) => {
        registration(payload)
          .then((res) => {
            const accessToken = res.access_token;
            const refreshToken = res.refresh_token;
            Cookies.set("refreshToken", refreshToken);

            ctx.commit("fetchSuccess", accessToken); // -- Set access token
            resolve(res);
          })
          .catch((error) => {
            if (error.response) {
              reject(error.response.data.error);
            } else if (error.message) reject(error.message);
          });
      });
    },

    // === Login fetch user
    async userLoginFetch(ctx, payload) {
      return new Promise((resolve, reject) => {
        login(payload)
          .then((res) => {
            const accessToken = res.access_token;
            const refreshToken = res.refresh_token;
            Cookies.set("refreshToken", refreshToken);

            ctx.commit("fetchSuccess", accessToken); // -- Set access token
            resolve(res);
          })
          .catch((error) => {
            if (error.response) {
              reject(error.response.data.error);
            } else if (error.message) reject(error.message);
          });
      });
    },

    // === Refresh token user
    async refreshTokenFetch(ctx, payload) {
      return new Promise((resolve, reject) => {
        refresh(payload)
          .then((res) => {
            const accessToken = res.access_token;
            const refreshToken = res.refresh_token;
            Cookies.set("refreshToken", refreshToken);

            ctx.commit("fetchSuccess", accessToken); // -- Set access token
            resolve(res);
          })
          .catch((error) => {
            if (error.response) {
              reject(error.response.data.error);
            } else if (error.message) reject(error.message);
          });
      });
    },

    // === Logout user
    async userLogoutFetch(ctx) {
      return new Promise((resolve) => {
        ctx.commit("resetToken");
        resolve();
      });
    },
  },

  mutations: {
    fetchSuccess(state, accessToken) {
      state.token = accessToken;
    },
    resetToken(state) {
      state.token = "";
    },
  },

  getters: {
    getAccessToken(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
  },
};

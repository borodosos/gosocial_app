import { login, refresh, registration } from "@/http/userApi";
import parseToken from "@/utils/parseToken";
import createEcho from "../utils/createEcho";

export default {
  state: {
    token: "",
  },

  actions: {
    // === Registration fetch user
    userRegisterFetch(ctx, payload) {
      return new Promise((resolve, reject) => {
        registration(payload)
          .then((res) => {
            const accessToken = res.access_token;

            const userDetails = parseToken(accessToken).user_info;
            ctx.dispatch("initUser", userDetails); // -- Init user
            ctx.commit("fetchSuccess", accessToken); // -- Set access token
            createEcho(accessToken, userDetails.id);

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
    userLoginFetch(ctx, payload) {
      return new Promise((resolve, reject) => {
        login(payload)
          .then((res) => {
            const accessToken = res.access_token;

            const userDetails = parseToken(accessToken).user_info;
            ctx.dispatch("initUser", userDetails); // -- Init user
            ctx.commit("fetchSuccess", accessToken); // -- Set access token
            createEcho(accessToken, userDetails.id);
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
    refreshTokenFetch(ctx) {
      return new Promise((resolve, reject) => {
        refresh()
          .then((res) => {
            const accessToken = res.access_token;

            const userDetails = parseToken(accessToken).user_info;
            ctx.dispatch("initUser", userDetails); // -- Init user
            ctx.commit("fetchSuccess", accessToken); // -- Set access token
            createEcho(accessToken, userDetails.id);

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
    userLogoutFetch(ctx) {
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

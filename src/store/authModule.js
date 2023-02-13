import { googleAuth, login, refresh, registration } from "@/http/userApi";
import parseToken from "@/utils/parseToken";

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
            resolve(res);
          })
          .catch((error) => {
            if (error.response) {
              reject(error.response.data.error);
            } else if (error.message) reject(error.message);
          });
      });
    },

    // === Google auth user
    userGoogleAuth(ctx, payload) {
      return new Promise((resolve, reject) => {
        googleAuth(payload)
          .then((res) => {
            // const accessToken = res.access_token;
            // const refreshToken = res.refresh_token;
            // Cookies.set("refreshToken", refreshToken);

            // const userDetails = parseToken(accessToken).user_info;
            // ctx.dispatch("initUser", userDetails); // -- Init user
            // ctx.commit("fetchSuccess", accessToken); // -- Set access token
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

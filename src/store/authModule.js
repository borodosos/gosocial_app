import { login, registration } from "@/http/userApi";
import axios from "axios";

export default {
  state: {
    token: localStorage.getItem("accessToken") || "",
  },

  actions: {
    // === Registration fetch user
    async userRegisterFetch(ctx, payload) {
      return new Promise((resolve, reject) => {
        registration(payload)
          .then((res) => {
            const accessToken = res.access_token;
            localStorage.setItem("accessToken", accessToken);

            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;

            ctx.commit("fetchSuccess", accessToken);
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
            localStorage.setItem("accessToken", accessToken);

            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;

            ctx.commit("fetchSuccess", accessToken);
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
        localStorage.removeItem("accessToken");
        delete axios.defaults.headers.common["Authorization"];
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

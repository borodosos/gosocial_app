import { login, registration } from "@/http/userApi";
import axios from "axios";
import store from ".";

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
            const accessToken = res.token_data.access_token;
            localStorage.setItem("accessToken", accessToken);

            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;

            ctx.commit("fetchSuccess", accessToken);
            resolve(res);
          })
          .catch((error) => {
            console.log(error);

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
            const accessToken = res.token_data.access_token;
            localStorage.setItem("accessToken", accessToken);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            ctx.commit("fetchSuccess", res);

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
    fetchSuccess(state, payload) {
      state.token = payload.token_data.access_token;
      store.dispatch("initUser", payload.user_data);
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

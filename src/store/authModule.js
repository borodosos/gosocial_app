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
            if (res.access_token) {
              const accessToken = res.access_token;
              localStorage.setItem("accessToken", accessToken);
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${accessToken}`;
              ctx.commit("fetchSuccess", accessToken);
              resolve(res);
            }
          })
          .catch((error) => {
            if (error.response) {
              reject(error.response.data.error);
            } else if (error.message) reject(error.message);
          });
      });
    },
  },

  mutations: {
    fetchSuccess(state, token) {
      state.token = token;
    },
  },

  getters: {
    getAccessToken(state) {
      return state.token;
    },
  },
};

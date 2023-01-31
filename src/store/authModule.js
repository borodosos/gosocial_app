// import { login, registration } from "@/http/userApi";
// import axios from "axios";

export default {
  state: {
    token: localStorage.getItem("accessToken") || "",
  },

  actions: {},

  mutations: {},

  getters: {
    getAccessToken(state) {
      return state.token;
    },
  },
};

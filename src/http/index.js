/* eslint-disable no-unused-vars */
import router from "@/router";
import store from "@/store";
import axios from "axios";

const host = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL,
});

const authHost = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${store.getters.getAccessToken}`;
  return config;
};

authHost.interceptors.request.use(authInterceptor);

authHost.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 401) {
    store.dispatch("userLogoutFetch").then(() => {
      router.push("/login");
    });
  } else {
    return Promise.reject(err);
  }
});

export { authHost, host };

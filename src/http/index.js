import store from "@/store";
import axios from "axios";
import Cookies from "js-cookie";

const host = axios.create({
  baseURL:
    process.env.VUE_APP_SERVER_URL || process.env.example.VUE_APP_SERVER_URL,
});

const authHost = axios.create({
  baseURL:
    process.env.VUE_APP_SERVER_URL || process.env.example.VUE_APP_SERVER_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${store.getters.getAccessToken}`;
  return config;
};

authHost.interceptors.request.use(authInterceptor);

authHost.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 401) {
    store.dispatch("refreshTokenFetch", Cookies.get("refreshToken"));
  }
  return Promise.reject(err);
});

export { authHost, host };

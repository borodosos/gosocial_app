import store from "@/store";
import axios from "axios";
import { SERVER_URL } from "@/constants";

const host = axios.create({
  baseURL: SERVER_URL,
});

const authHost = axios.create({
  baseURL: SERVER_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${store.getters.getAccessToken}`;
  return config;
};

authHost.interceptors.request.use(authInterceptor);

authHost.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 401) {
    store.dispatch("refreshTokenFetch");
  }
  return Promise.reject(err);
});

export { authHost, host };

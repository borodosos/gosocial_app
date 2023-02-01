import store from "@/store";
import axios from "axios";

const host = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL,
});

const authHost = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
};

authHost.interceptors.request.use(authInterceptor);

authHost.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 401) {
    store.dispatch("userLogoutFetch").then(() => {
      this.$router.push("/login");
    });
  }
});

export { authHost, host };

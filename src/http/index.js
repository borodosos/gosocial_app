import axios from "axios";

const host = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL,
});

const authHost = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
};

authHost.interceptors.request.use(authInterceptor);

host.interceptors.response.use(() => {
  console.log("err");
});

export { authHost, host };

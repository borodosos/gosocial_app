/* eslint-disable no-unused-vars */
import { host } from "@/http";
import store from "@/store";

export const registration = async (formData) => {
  const { data } = await host.post("api/registration", formData);

  return data;
};

export const login = async (formData) => {
  const { data } = await host.post("api/login", formData);
  return data;
};

export const refresh = async (refreshToken) => {
  const { data } = await host.post("api/refresh", {
    refreshToken: refreshToken,
  });
  return data;
};

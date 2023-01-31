/* eslint-disable no-unused-vars */
import { authHost, host } from "@/http";
import store from "@/store";

export const registration = async (formData) => {
  const { data } = await host.post("api/registration", formData, {
    withCredentials: true,
  });

  return data;
};

export const login = async (formData) => {
  const { data } = await host.post("api/login", formData, {
    withCredentials: true,
  });
  return data;
};

export const fetchUserPosts = async () => {
  const { data } = await host.get("api/users");
  return data;
};

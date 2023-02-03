/* eslint-disable no-unused-vars */
import { authHost } from "@/http";
import store from "@/store";

export const getAllPosts = async () => {
  const { data } = await authHost.get("api/posts");

  return data;
};

export const getUserPosts = async (paramsId) => {
  const { data } = await authHost.get(`api/posts/${paramsId}`);

  return data;
};

/* eslint-disable no-unused-vars */
import { authHost } from "@/http";
import store from "@/store";

export const getAllPosts = async () => {
  const { data } = await authHost.get("api/posts");

  return data;
};

export const createPost = async (formData) => {
  const { data } = await authHost.post("api/posts", formData);

  return data;
};

export const searchPosts = async (query) => {
  const { data } = await authHost.get(`api/posts/`, {
    params: { keywords: query },
  });

  return data;
};

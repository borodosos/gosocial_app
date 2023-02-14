/* eslint-disable no-unused-vars */
import { authHost } from "@/http";
import store from "@/store";

export const getAllPosts = async (page) => {
  const { data } = await authHost.get(`api/posts/?page=${page}`);

  return data;
};

export const createPost = async (formData) => {
  const { data } = await authHost.post("api/posts", formData);

  return data;
};

export const searchPosts = async (query) => {
  const { data } = await authHost.get(`api/posts/`, {
    params: query,
  });

  return data;
};

export const addComment = async ({ formData, postId }) => {
  const { data } = await authHost.post(
    `api/posts/${postId}/comments`,
    formData
  );

  return data;
};

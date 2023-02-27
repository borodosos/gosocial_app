import { authHost } from "@/http";

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

export const deletePost = async (id) => {
  const { data } = await authHost.delete(`api/posts/${id}`);

  return data;
};

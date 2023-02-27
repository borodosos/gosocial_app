import { authHost } from ".";

export const addComment = async ({ formData, postId }) => {
  const { data } = await authHost.post(
    `api/posts/${postId}/comments`,
    formData
  );

  return data;
};

export const updateComment = async ({ formData, commentId }) => {
  const { data } = await authHost.post(
    `api/comments/${commentId}?_method=PATCH`,
    formData
  );

  return data;
};

export const deleteComment = async (commentId) => {
  const { data } = await authHost.delete(`api/comments/${commentId}`);

  return data;
};

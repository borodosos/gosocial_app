import { authHost } from "@/http";

export const sendMessage = async (formData) => {
  const { data } = await authHost.post("api/messages", formData);

  return data;
};

export const getAllMessages = async (id) => {
  const { data } = await authHost.get(`api/messages/${id}`);

  return data;
};

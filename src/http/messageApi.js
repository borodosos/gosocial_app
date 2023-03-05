import { authHost } from "@/http";

export const sendMessage = async (formData) => {
  const { data } = await authHost.post("api/message", formData);

  return data;
};

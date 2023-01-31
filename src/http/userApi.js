import { host } from "@/http";

export const registration = async (formData) => {
  const { data } = await host.post("api/registration", formData);

  return data;
};

export const login = async (formData) => {
  const { data } = await host.post("api/login", formData);
  return data;
};

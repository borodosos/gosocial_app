import { host } from "@/http";

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

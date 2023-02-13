import { authHost, host } from "@/http";

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

export const refresh = async () => {
  const { data } = await host.get("api/refresh", {
    withCredentials: true,
  });
  return data;
};

export const getUserInfo = async (paramsId) => {
  const { data } = await authHost.get(`api/users/${paramsId}`);
  return data;
};

export const updateUserInfo = async (paramsId, formData) => {
  const { data } = await authHost.post(
    `api/users/${paramsId}?_method=PATCH`,
    formData
  );
  return data;
};

export const googleAuth = async () => {
  const { data } = await host.get("api/google/login", {
    withCredentials: true,
  });
  return data;
};

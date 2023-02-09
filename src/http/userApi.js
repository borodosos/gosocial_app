import { authHost, host } from "@/http";

export const registration = async (formData) => {
  const { data } = await host.post("api/registration", formData);

  return data;
};

export const login = async (formData) => {
  const { data } = await host.post("api/login", formData);
  return data;
};

export const refresh = async (refreshToken) => {
  const { data } = await host.post("api/refresh", {
    refreshToken: refreshToken,
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

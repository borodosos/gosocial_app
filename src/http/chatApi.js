import { authHost } from ".";

export const createSession = async (friendId) => {
  const { data } = await authHost.post("api/sessions", friendId);
  return data;
};

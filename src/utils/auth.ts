export const KEY_TOKEN = "pointer-app-token";

export const getToken = () => localStorage.getItem(KEY_TOKEN);
export const setToken = (token: string) =>
  localStorage.setItem(KEY_TOKEN, token);
export const removeToken = () => localStorage.removeItem(KEY_TOKEN);

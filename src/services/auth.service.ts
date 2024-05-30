import { api } from "./api";

const AUTH_DOMAIN = "auth";

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export type SignInInput = {
  email: string;
  password: string;
};

const signIn = ({
  email,
  password,
}: SignInInput): Promise<{ user: UserDTO; token: string }> => {
  return api.post(`${AUTH_DOMAIN}/login`, { email, password });
};

export const AuthService = {
  signIn,
};

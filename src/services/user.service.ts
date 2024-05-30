import { MetaPagination, Pagination } from "@/types/pagination";
import { api } from "./api";

const USER_DOMAIN = "users";

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
};

export type UserInput = {
  name: string;
};

const getAll = ({
  page = 1,
  limit = 10,
}: Pagination): Promise<{ meta: MetaPagination; data: UserDTO[] }> => {
  return api.get(`${USER_DOMAIN}?page=${page}&limit=${limit}`);
};

export const UserService = {
  getAll,
};

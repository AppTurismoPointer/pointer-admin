import { MetaPagination, Pagination } from "@/types/pagination";
import { api } from "./api";

const USER_ADMIN_DOMAIN = "users-admin";

export type UserAdminDTO = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export type UserAdminInput = {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
};

const getAll = ({
  page = 1,
  limit = 10,
}: Pagination): Promise<{ meta: MetaPagination; data: UserAdminDTO[] }> => {
  return api.get(`${USER_ADMIN_DOMAIN}?page=${page}&limit=${limit}`);
};

const getById = (id: string): Promise<{ data: UserAdminDTO }> => {
  return api.get(`${USER_ADMIN_DOMAIN}/${id}`);
};

const create = ({
  name,
  email,
  password,
  password_confirmation,
}: UserAdminInput): Promise<void> => {
  return api.post(`${USER_ADMIN_DOMAIN}`, {
    name,
    email,
    password,
    password_confirmation,
  });
};

const update = (id: string, { name, email }: UserAdminInput): Promise<void> => {
  return api.put(`${USER_ADMIN_DOMAIN}/${id}`, {
    name,
    email,
  });
};

const remove = (id: string): Promise<void> => {
  return api.delete(`${USER_ADMIN_DOMAIN}/${id}`);
};

export const UserAdminService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

import { Pagination } from "@/types/pagination";
import { api } from "./api";

const MANAGER_DOMAIN = "managers";

const getAll = ({
  page = 1,
  limit = 10,
}: Pagination): Promise<WithPagination<Manager>> => {
  return api.get(`${MANAGER_DOMAIN}?page=${page}&limit=${limit}`);
};

const getById = (id: string): Promise<{ data: Manager }> => {
  return api.get(`${MANAGER_DOMAIN}/${id}`);
};

const create = ({
  name,
  email,
  password,
  password_confirmation,
  company_id,
}: ManagerInput): Promise<void> => {
  return api.post(`${MANAGER_DOMAIN}`, {
    name,
    email,
    password,
    password_confirmation,
    company_id,
  });
};

const update = (id: string, { name, email }: ManagerInput): Promise<void> => {
  return api.put(`${MANAGER_DOMAIN}/${id}`, {
    name,
    email,
  });
};

const remove = (id: string): Promise<void> => {
  return api.delete(`${MANAGER_DOMAIN}/${id}`);
};

export const ManagerService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

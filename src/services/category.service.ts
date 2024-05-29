import { MetaPagination, Pagination } from "@/types/pagination";
import { api } from "./api";

const CATEGORY_DOMAIN = "categories";

export type CategoryDTO = {
  id: string;
  name: string;
  created_at: string;
};

export type CategoryInput = {
  name: string;
};

const getAll = ({
  page = 1,
  limit = 10,
}: Pagination): Promise<{ meta: MetaPagination; data: CategoryDTO[] }> => {
  return api.get(`${CATEGORY_DOMAIN}?page=${page}&limit=${limit}`);
};

const getById = (id: string): Promise<{ data: CategoryDTO }> => {
  return api.get(`${CATEGORY_DOMAIN}/${id}`);
};

const create = ({ name }: CategoryInput): Promise<void> => {
  return api.post(`${CATEGORY_DOMAIN}`, { name });
};

const update = (id: string, { name }: CategoryInput): Promise<void> => {
  return api.put(`${CATEGORY_DOMAIN}/${id}`, { name });
};

const remove = (id: string): Promise<void> => {
  return api.delete(`${CATEGORY_DOMAIN}/${id}`);
};

export const CategoryService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

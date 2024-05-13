import { MetaPagination, Pagination } from "@/types/pagination";
import { api } from "./api";

const CATEGORY_DOMAIN = "categories";

export type CategoryDTO = {
  id: string;
  name: string;
  created_at: string;
};

const getAll = ({
  page = 1,
  limit = 10,
}: Pagination): Promise<{ meta: MetaPagination; data: CategoryDTO[] }> => {
  return api.get(`${CATEGORY_DOMAIN}?page=${page}&limit=${limit}`);
};

export const CategoryService = {
  getAll,
  //   getById,
  //   create,
  //   update,
  //   delete,
};

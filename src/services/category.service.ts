import { api } from "./api";

const CATEGORY_DOMAIN = "categories";

export type CategoryDTO = {
  id: string;
  name: string;
  created_at: string;
};

const getAll = (): Promise<CategoryDTO[]> => {
  return api.get(`${CATEGORY_DOMAIN}`);
};

export const CategoryService = {
  getAll,
  //   getById,
  //   create,
  //   update,
  //   delete,
};

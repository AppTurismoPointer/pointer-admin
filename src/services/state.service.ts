import { MetaPagination, Pagination } from "@/types/pagination";
import { api } from "./api";

const STATE_DOMAIN = "states";

export type StateDTO = {
  id: string;
  name: string;
};

const getAll = ({
  page = 1,
  limit = 10,
  search = "",
}: Pagination): Promise<{ meta: MetaPagination; data: StateDTO[] }> => {
  return api.get(
    `${STATE_DOMAIN}?page=${page}&limit=${limit}&search=${search}`
  );
};

export const StateService = {
  getAll,
};

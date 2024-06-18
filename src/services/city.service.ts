import { MetaPagination, Pagination } from "@/types/pagination";
import { api } from "./api";

const CITY_DOMAIN = "cities";

export type CityDTO = {
  id: string;
  name: string;
};

const getAll = (
  stateId: string,
  { page = 1, limit = 10 }: Pagination
): Promise<{ meta: MetaPagination; data: CityDTO[] }> => {
  return api.get(
    `${CITY_DOMAIN}?page=${page}&limit=${limit}&stateId=${stateId}`
  );
};

export const CityService = {
  getAll,
};

import { MetaPagination, Pagination } from "@/types/pagination";
import { api } from "./api";

const CITY_DOMAIN = "cities";

export type CityDTO = {
  id: string;
  name: string;
};

export type CityInput = {
  name: string;
  state_id: string;
};

const getAll = (
  stateId: string,
  { page = 1, limit = 10, search = "" }: Pagination
): Promise<{ meta: MetaPagination; data: CityDTO[] }> => {
  return api.get(
    `${CITY_DOMAIN}?page=${page}&limit=${limit}&state_id=${stateId}&search=${search}`
  );
};

const create = ({ name, state_id }: CityInput): Promise<void> => {
  return api.post(`${CITY_DOMAIN}`, { name, state_id });
};

const update = (id: string, { name, state_id }: CityInput): Promise<void> => {
  return api.put(`${CITY_DOMAIN}/${id}`, { name, state_id });
};

const remove = (id: string): Promise<void> => {
  return api.delete(`${CITY_DOMAIN}/${id}`);
};

export const CityService = {
  getAll,
  create,
  update,
  remove,
};

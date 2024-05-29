import { Pagination, MetaPagination } from "@/types/pagination";
import { api } from "./api";

const LOCATION_DOMAIN = "locations";

export type LocationDTO = {
  id: string;
  name: string;
  preview: string;
  city: string;
  state: string;
};

export type LocationInput = {
  name: string;
  city_id: string;
  file_id: string;
};

const getAll = ({
  page = 1,
  limit = 10,
}: Pagination): Promise<{ meta: MetaPagination; data: LocationDTO[] }> => {
  return api.get(`${LOCATION_DOMAIN}?page=${page}&limit=${limit}`);
};

const getById = (id: string): Promise<{ data: LocationDTO }> => {
  return api.get(`${LOCATION_DOMAIN}/${id}`);
};

const create = ({ name, file_id, city_id }: LocationInput): Promise<void> => {
  return api.post(`${LOCATION_DOMAIN}`, { name, file_id, city_id });
};

const update = (id: string, { name }: LocationInput): Promise<void> => {
  return api.put(`${LOCATION_DOMAIN}/${id}`, { name });
};

const remove = (id: string): Promise<void> => {
  return api.delete(`${LOCATION_DOMAIN}/${id}`);
};

export const LocationService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

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

export type LocationByIdDTO = {
  id: string;
  name: string;
  preview: string;
  city: {
    id: string;
    name: string;
    state: {
      id: string;
      name: string;
    };
  };
  file: {
    id: string;
    name: string;
  };
};

export type LocationInput = {
  name: string;
  city_id: string;
  file_id: string;
};

const getAll = (
  cityId: string,
  { page = 1, limit = 10 }: Pagination
): Promise<{ meta: MetaPagination; data: LocationDTO[] }> => {
  return api.get(
    `${LOCATION_DOMAIN}?page=${page}&limit=${limit}&cityId=${cityId}`
  );
};

const getById = (id: string): Promise<{ data: LocationByIdDTO }> => {
  return api.get(`${LOCATION_DOMAIN}/${id}`);
};

const create = ({ name, file_id, city_id }: LocationInput): Promise<void> => {
  return api.post(`${LOCATION_DOMAIN}`, { name, file_id, city_id });
};

const update = (
  id: string,
  { name, file_id, city_id }: LocationInput
): Promise<void> => {
  return api.put(`${LOCATION_DOMAIN}/${id}`, { name, file_id, city_id });
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

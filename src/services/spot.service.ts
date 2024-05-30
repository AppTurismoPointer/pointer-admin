import { Pagination, MetaPagination } from "@/types/pagination";
import { api } from "./api";

const SPOT_DOMAIN = "spots";

export type SpotDTO = {
  id: string;
  name: string;
  preview: string;
  city: string;
  state: string;
  category: string;
};

export type SpotByIdDTO = {
  id: string;
  name: string;
  preview: string;
  latitude: number;
  longitude: number;
  category: {
    id: string;
    name: string;
  };
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
    preview: string;
  };
};

export type SpotInput = {
  name: string;
  city_id: string;
  category_id: string;
  file_id: string;
  latitude: number;
  longitude: number;
};

const getAll = ({
  page = 1,
  limit = 10,
}: Pagination): Promise<{ meta: MetaPagination; data: SpotDTO[] }> => {
  return api.get(`${SPOT_DOMAIN}?page=${page}&limit=${limit}`);
};

const getById = (id: string): Promise<{ data: SpotByIdDTO }> => {
  return api.get(`${SPOT_DOMAIN}/${id}`);
};

const create = ({
  name,
  city_id,
  category_id,
  file_id,
  latitude,
  longitude,
}: SpotInput): Promise<void> => {
  return api.post(`${SPOT_DOMAIN}`, {
    name,
    city_id,
    category_id,
    file_id,
    latitude,
    longitude,
  });
};

const update = (
  id: string,
  { name, city_id, category_id, file_id, latitude, longitude }: SpotInput
): Promise<void> => {
  return api.put(`${SPOT_DOMAIN}/${id}`, {
    name,
    city_id,
    category_id,
    file_id,
    latitude,
    longitude,
  });
};

const remove = (id: string): Promise<void> => {
  return api.delete(`${SPOT_DOMAIN}/${id}`);
};

export const SpotService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

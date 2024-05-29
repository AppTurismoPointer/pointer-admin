import { Pagination, MetaPagination } from "@/types/pagination";
import { api } from "./api";

const SPOT_DOMAIN = "spots";

export type SpotDTO = {
  id: string;
  name: string;
  preview: string;
  city: string;
  state: string;
};

export type SpotInput = {
  name: string;
  preview: string;
  city: string;
  state: string;
};

const getAll = ({
  page = 1,
  limit = 10,
}: Pagination): Promise<{ meta: MetaPagination; data: SpotDTO[] }> => {
  return api.get(`${SPOT_DOMAIN}?page=${page}&limit=${limit}`);
};

const getById = (id: string): Promise<{ data: SpotDTO }> => {
  return api.get(`${SPOT_DOMAIN}/${id}`);
};

const create = ({ name }: SpotInput): Promise<void> => {
  return api.post(`${SPOT_DOMAIN}`, { name });
};

const update = (id: string, { name }: SpotInput): Promise<void> => {
  return api.put(`${SPOT_DOMAIN}/${id}`, { name });
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

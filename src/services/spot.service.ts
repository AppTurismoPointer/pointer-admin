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

const getAll = ({
  page = 1,
  limit = 10,
}: Pagination): Promise<{ meta: MetaPagination; data: SpotDTO[] }> => {
  return api.get(`${SPOT_DOMAIN}?page=${page}&limit=${limit}`);
};

export const SpotService = {
  getAll,
  //   getById,
  //   create,
  //   update,
  //   delete,
};

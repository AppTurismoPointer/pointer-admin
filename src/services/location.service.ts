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

const getAll = ({
  page = 1,
  limit = 10,
}: Pagination): Promise<{ meta: MetaPagination; data: LocationDTO[] }> => {
  return api.get(`${LOCATION_DOMAIN}?page=${page}&limit=${limit}`);
};

export const LocationService = {
  getAll,
  //   getById,
  //   create,
  //   update,
  //   delete,
};

import { api } from "./api";

const LOCATION_DOMAIN = "locations";

export type LocationDTO = {
  id: string;
  name: string;
  preview: string;
  city: string;
  state: string;
};

const getAll = (): Promise<LocationDTO[]> => {
  return api.get(`${LOCATION_DOMAIN}`);
};

export const LocationService = {
  getAll,
  //   getById,
  //   create,
  //   update,
  //   delete,
};

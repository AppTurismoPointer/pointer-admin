import { api } from "./api";

const STATE_DOMAIN = "states";

export type StateDTO = {
  id: string;
  name: string;
};

export type StateByIdDTO = {
  id: string;
  name: string;
  cities: CityDTO[];
};

export type CityDTO = {
  id: string;
  name: string;
};

const getAll = (): Promise<{ data: StateDTO[] }> => {
  return api.get(`${STATE_DOMAIN}`);
};

const getById = (stateId: string): Promise<{ data: StateByIdDTO }> => {
  return api.get(`${STATE_DOMAIN}/${stateId}`);
};

export const StateService = {
  getAll,
  getById,
};

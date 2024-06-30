import { Pagination, MetaPagination } from "@/types/pagination";
import { api } from "./api";
import { Spot } from "@/pages/spots/Spots/schema";

const LOCATION_DOMAIN = "locations";

export type Gallery = {
  id: string;
  location_id: string;
  file_id: string;
  preview: string;
  file: {
    id: string;
    name: string;
  };
  created_at: string;
};

export type LocationAssociates = {
  id: string;
  location_id: string;
  spot_id: string;
  spot: Spot;
};

export type LocationAssociatesCombo = {
  id: string;
  name: string;
};

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
  description: string;
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
  description: string;
};

export type LocationGalleryInput = {
  location_id: string;
  file_id: string;
};

export type LocationAssociatedInput = {
  location_id: string;
  spot_id: string;
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

const create = ({
  name,
  file_id,
  city_id,
  description,
}: LocationInput): Promise<void> => {
  return api.post(`${LOCATION_DOMAIN}`, {
    name,
    file_id,
    city_id,
    description,
  });
};

const update = (
  id: string,
  { name, file_id, city_id, description }: LocationInput
): Promise<void> => {
  return api.put(`${LOCATION_DOMAIN}/${id}`, {
    name,
    file_id,
    city_id,
    description,
  });
};

const remove = (id: string): Promise<void> => {
  return api.delete(`${LOCATION_DOMAIN}/${id}`);
};

const getAllGallery = (
  locationId: string
): Promise<{ meta: MetaPagination; data: Gallery[] }> => {
  return api.get(`${LOCATION_DOMAIN}/${locationId}/gallery`);
};

const createGallery = ({
  location_id,
  file_id,
}: LocationGalleryInput): Promise<void> => {
  return api.post(`${LOCATION_DOMAIN}/gallery`, {
    location_id,
    file_id,
  });
};

const removeGallery = (galleryId: string): Promise<void> => {
  return api.delete(`${LOCATION_DOMAIN}/gallery/${galleryId}`);
};

const getAllAssociates = (
  locationId: string
): Promise<{ data: LocationAssociates[] }> => {
  return api.get(`${LOCATION_DOMAIN}/${locationId}/associates`);
};

const getComboAssociates = (
  locationId: string
): Promise<{ data: LocationAssociatesCombo[] }> => {
  return api.get(`${LOCATION_DOMAIN}/${locationId}/associates/combo`);
};

const createAssociates = ({
  location_id,
  spot_id,
}: LocationAssociatedInput): Promise<void> => {
  return api.post(`${LOCATION_DOMAIN}/associates`, {
    location_id,
    spot_id,
  });
};

const removeAssociates = (id: string): Promise<void> => {
  return api.delete(`${LOCATION_DOMAIN}/associates/${id}`);
};

export const LocationService = {
  getAll,
  getById,
  create,
  update,
  remove,
  gallery: {
    getAll: getAllGallery,
    create: createGallery,
    remove: removeGallery,
  },
  associates: {
    getAll: getAllAssociates,
    getCombo: getComboAssociates,
    create: createAssociates,
    remove: removeAssociates,
  },
};

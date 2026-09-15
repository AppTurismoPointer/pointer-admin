import { Pagination, MetaPagination } from "@/types/pagination";
import { api } from "./api";

const SPOT_DOMAIN = "spots";

export type PaymentMethodType = "PIX" | "CREDIT_CARD" | "CASH";
export type TransportMethodType = "UBER" | "TAXI" | "BIKE" | "TRANSFER" | "BUS";
export type SpotType = "ESTABLISHMENT" | "SERVICE";

export type Gallery = {
  id: string;
  spot_id: string;
  file_id: string;
  preview: string;
  file: {
    id: string;
    name: string;
  };
  created_at: string;
};

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
  price: number;
  description: string;
  transport_methods: TransportMethodType[];
  payment_methods: PaymentMethodType[];
  type: SpotType;
  address_street: string | null;
  address_number: string | null;
  address_neighborhood: string | null;
  address_postal_code: string | null;
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
  company: {
    id: string;
    name: string;
    file_id: string;
    phone: string;
    created_at: string;
  };
};

export type SpotInput = {
  name: string;
  city_id: string;
  category_id: string;
  company_id: string;
  file_id: string;
  latitude: number;
  longitude: number;
  payment_methods: PaymentMethodType[];
  transport_methods: TransportMethodType[];
  type: SpotType;
  description: string;
  price?: number;
  address_street?: string;
  address_number?: string;
  address_neighborhood?: string;
  address_postal_code?: string;
};

export type SpotGalleryInput = {
  spot_id: string;
  file_id: string;
};

const getAll = (
  cityId: string,
  { page = 1, limit = 10, search = "" }: Pagination
): Promise<{ meta: MetaPagination; data: SpotDTO[] }> => {
  return api.get(
    `${SPOT_DOMAIN}?page=${page}&limit=${limit}&cityId=${cityId}&search=${search}`
  );
};

const getById = (id: string): Promise<{ data: SpotByIdDTO }> => {
  return api.get(`${SPOT_DOMAIN}/${id}`);
};

const create = ({
  name,
  city_id,
  category_id,
  company_id,
  file_id,
  latitude,
  longitude,
  payment_methods,
  transport_methods,
  type,
  description,
  price,
  address_street,
  address_number,
  address_neighborhood,
  address_postal_code,
}: SpotInput): Promise<void> => {
  return api.post(`${SPOT_DOMAIN}`, {
    name,
    city_id,
    category_id,
    company_id,
    file_id,
    latitude,
    longitude,
    payment_methods,
    transport_methods,
    type,
    description,
    price,
    address_street,
    address_number,
    address_neighborhood,
    address_postal_code,
  });
};

const update = (
  id: string,
  {
    name,
    city_id,
    category_id,
    company_id,
    file_id,
    latitude,
    longitude,
    payment_methods,
    transport_methods,
    type,
    description,
    price,
    address_street,
    address_number,
    address_neighborhood,
    address_postal_code,
  }: SpotInput
): Promise<void> => {
  return api.put(`${SPOT_DOMAIN}/${id}`, {
    name,
    city_id,
    category_id,
    company_id,
    file_id,
    latitude,
    longitude,
    payment_methods,
    transport_methods,
    type,
    description,
    price,
    address_street,
    address_number,
    address_neighborhood,
    address_postal_code,
  });
};

const remove = (id: string): Promise<void> => {
  return api.delete(`${SPOT_DOMAIN}/${id}`);
};

const getAllGallery = (
  spotId: string
): Promise<{ meta: MetaPagination; data: Gallery[] }> => {
  return api.get(`${SPOT_DOMAIN}/${spotId}/gallery`);
};

const createGallery = ({
  spot_id,
  file_id,
}: SpotGalleryInput): Promise<void> => {
  return api.post(`${SPOT_DOMAIN}/gallery`, {
    spot_id,
    file_id,
  });
};

const removeGallery = (galleryId: string): Promise<void> => {
  return api.delete(`${SPOT_DOMAIN}/gallery/${galleryId}`);
};

export const SpotService = {
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
};

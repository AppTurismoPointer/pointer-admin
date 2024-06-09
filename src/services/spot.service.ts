import { Pagination, MetaPagination } from "@/types/pagination";
import { api } from "./api";

const SPOT_DOMAIN = "spots";

export type PaymentMethodType = "PIX" | "BANK_TRANSFER" | "BOLETO";
export type TransportMethodType = "UBER" | "TAXI" | "BIKE" | "TRANSFER" | "BUS";
export type SpotType = "ESTABLISHMENT" | "SERVICE";

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
  company_id,
  file_id,
  latitude,
  longitude,
  payment_methods,
  transport_methods,
  type,
  description,
  price,
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

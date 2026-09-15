import { MetaPagination, Pagination } from "@/types/pagination";
import { api } from "./api";

const COMPANY_DOMAIN = "companies";

export type CompanyDTO = {
  id: string;
  name: string;
  phone: string;
  preview: string;
  accept_reservation: boolean;
  accept_scheduling: boolean;
};

export type CompanyByIdDTO = {
  id: string;
  name: string;
  phone: string;
  preview: string;
  accept_reservation: boolean;
  accept_scheduling: boolean;
  file: {
    id: string;
    name: string;
  };
};

export type CompanyInput = {
  name: string;
  phone: string;
  file_id: string;
  accept_reservation: boolean;
  accept_scheduling: boolean;
};

const getAll = ({
  page = 1,
  limit = 10,
  search = "",
}: Pagination): Promise<{ meta: MetaPagination; data: CompanyDTO[] }> => {
  return api.get(`${COMPANY_DOMAIN}?page=${page}&limit=${limit}&search=${search}`);
};

const getById = (id: string): Promise<{ data: CompanyByIdDTO }> => {
  return api.get(`${COMPANY_DOMAIN}/${id}`);
};

const create = ({
  name,
  file_id,
  phone,
  accept_reservation,
  accept_scheduling,
}: CompanyInput): Promise<void> => {
  return api.post(`${COMPANY_DOMAIN}`, {
    name,
    file_id,
    phone,
    accept_reservation,
    accept_scheduling,
  });
};

const update = (
  id: string,
  { name, file_id, phone, accept_reservation, accept_scheduling }: CompanyInput
): Promise<void> => {
  return api.put(`${COMPANY_DOMAIN}/${id}`, {
    name,
    file_id,
    phone,
    accept_reservation,
    accept_scheduling,
  });
};

const remove = (id: string): Promise<void> => {
  return api.delete(`${COMPANY_DOMAIN}/${id}`);
};

export const CompanyService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

import { MetaPagination, Pagination } from "@/types/pagination";
import { api } from "./api";

const COMPANY_DOMAIN = "companies";

export type CompanyDTO = {
  id: string;
  name: string;
  phone: string;
  preview: string;
};

export type CompanyByIdDTO = {
  id: string;
  name: string;
  phone: string;
  preview: string;
  file: {
    id: string;
    name: string;
  };
};

export type CompanyInput = {
  name: string;
  phone: string;
  file_id: string;
};

const getAll = ({
  page = 1,
  limit = 10,
}: Pagination): Promise<{ meta: MetaPagination; data: CompanyDTO[] }> => {
  return api.get(`${COMPANY_DOMAIN}?page=${page}&limit=${limit}`);
};

const getById = (id: string): Promise<{ data: CompanyByIdDTO }> => {
  return api.get(`${COMPANY_DOMAIN}/${id}`);
};

const create = ({ name, file_id, phone }: CompanyInput): Promise<void> => {
  return api.post(`${COMPANY_DOMAIN}`, { name, file_id, phone });
};

const update = (
  id: string,
  { name, file_id, phone }: CompanyInput
): Promise<void> => {
  return api.put(`${COMPANY_DOMAIN}/${id}`, { name, file_id, phone });
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

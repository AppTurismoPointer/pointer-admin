export type Pagination = {
  page?: number;
  limit?: number;
};

export type MetaPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

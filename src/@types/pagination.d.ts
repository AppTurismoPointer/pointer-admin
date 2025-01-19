type WithPagination<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: Data<T>[];
};

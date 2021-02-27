export type ResponseType<T> = {
  success: boolean;
  message: string;
  data: T;
};

type Pagination = {
  page: number;
  count: 2;
  currentPage: 1;
  perPage: 10;
  allPage: 1;
};

export type ResponsePaginationType<T> = ResponseType<T> & Pagination;

export type ResponseType<T> = {
  success: boolean;
  message: string;
  data: T;
};

type Pagination = {
  count: number;
  currentPage: number;
  perPage: number;
  allPage: number;
};

export type ResponsePaginationType<T> = ResponseType<T> & Pagination;

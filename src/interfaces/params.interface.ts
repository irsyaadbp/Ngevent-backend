export interface ParamsQuery {
  page?: number;
  perPage?: number;
  search?: string;
  orderBy?: "asc" | "desc";
  sortBy?: string;
  filter?: string;
  startDate?: Date;
  endDate?: Date;
}

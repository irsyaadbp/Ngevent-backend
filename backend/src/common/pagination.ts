import { ParamsQuery } from "../interfaces/params.interface";

export class Pagination {
  public pagination(params: ParamsQuery) {
    const limit = Number(params.perPage) || 10;
    const page = Number(params.page) || 1;
    const offset = limit * (page - 1);

    return {
      limit,
      offset,
      page,
    };
  }
}

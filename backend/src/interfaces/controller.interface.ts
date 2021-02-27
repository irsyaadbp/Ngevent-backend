import { Response } from "express";
import { RequestWithUser } from "./auth.interface.ts";

export default interface Controller<T> {
  getAll: (req: RequestWithUser, res: Response) => Promise<PaginateResponse<T>>;
  getById: (req: RequestWithUser, res: Response) => Promise<AppResponse<T>>;
  createNew: (req: RequestWithUser, res: Response) => Promise<AppResponse<T>>;
  update?: (req: RequestWithUser, res: Response) => Promise<AppResponse<T>>;
  delete?: (req: RequestWithUser, res: Response) => Promise<AppResponse<T>>;
}

interface IPagination {
  count: number;
  currentPage: number;
  perPage: number;
  allPage: number;
}
type TypedResponse<T> = Omit<Response, "json"> & { json(data: T): Response };

export type AppResponse<T> = TypedResponse<{
  success: boolean;
  message: string;
  data?: T;
}>;

export type PaginateResponse<T> = TypedResponse<
  {
    success: boolean;
    message: string;
    data?: T[];
  } & IPagination
>;

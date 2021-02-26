import { Router } from "express";

export default interface IRouter {
  path: string;
  router: Router;
}

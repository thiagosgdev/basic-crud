import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeAddUserController } from "../factories/controllers/add-user-controller-factory";

export default (router: Router): void => {
    router.post("/users", adaptRoute(makeAddUserController()));

};
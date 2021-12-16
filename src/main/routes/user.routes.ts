import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeAddUserController } from "../factories/controllers/add-user-controller-factory";
import { makeFindUserController } from "../factories/controllers/find-user-controller-factory";
import { makeListUsersController } from "../factories/controllers/list-users-controller-factory";

export default (router: Router): void => {
    router.get("/users/:cpf/:name", adaptRoute(makeFindUserController()));
    router.post("/users", adaptRoute(makeAddUserController()));
    router.get("/users", adaptRoute(makeListUsersController()));
};
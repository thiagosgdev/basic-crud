import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeAddUserController } from "../factories/controllers/add/add-user-controller-factory";
import { makeDeleteUserController } from "../factories/controllers/delete-user-controller-factory";
import { makeFindUserController } from "../factories/controllers/find-user-controller-factory";
import { makeListUsersController } from "../factories/controllers/list-users-controller-factory";
import { makeUpdateUserController } from "../factories/controllers/update-user-controller-factory";

export default (router: Router): void => {
    router.get("/users/:cpf/:name?", adaptRoute(makeFindUserController()));
    router.post("/users", adaptRoute(makeAddUserController()));
    router.get("/users", adaptRoute(makeListUsersController()));
    router.put("/users", adaptRoute(makeUpdateUserController()));
    router.delete("/users", adaptRoute(makeDeleteUserController()));
};
import { FindUserController } from "@/presentation/controllers/find-user-controller";
import { ListUsersController } from "@/presentation/controllers/list-users-controller";
import { Controller } from "@/presentation/protocols";
import { makeDbFindUser } from "../usecases/user/db-find-user-factory";

export const makeFindUserController = (): Controller => {
    const controller = new FindUserController(makeDbFindUser());
    return controller;
};
import { ListUsersController } from "@/presentation/controllers/list-users-controller";
import { Controller } from "@/presentation/protocols";
import { makeDbListUsers } from "../usecases/user/db-list-users-factory";

export const makeListUsersController = (): Controller => {
    const controller = new ListUsersController(makeDbListUsers());
    return controller;
};
import { AddUserController } from "@/presentation/controllers/add-user-controller";
import { Controller } from "@/presentation/protocols";
import { makeDbAddUser } from "../usecases/user/db-add-user-factory";

export const makeAddUserController = (): Controller => {
    const controller = new AddUserController(makeDbAddUser());
    return controller;
};
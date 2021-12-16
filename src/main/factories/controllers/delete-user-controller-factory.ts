import { DeleteUserController } from "@/presentation/controllers/delete-user-controller";
import { Controller } from "@/presentation/protocols";
import { makeDbDeleteUser } from "../usecases/user/db-delete-user-factory";

export const makeDeleteUserController = (): Controller => {
    const controller = new DeleteUserController(makeDbDeleteUser());
    return controller;
};
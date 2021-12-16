import { UpdateUserController } from "@/presentation/controllers/update-user-controller";
import { Controller } from "@/presentation/protocols";
import { makeDbUpdateUser } from "../usecases/user/db-update-user-factory";

export const makeUpdateUserController = (): Controller => {
    const controller = new UpdateUserController(makeDbUpdateUser());
    return controller;
};
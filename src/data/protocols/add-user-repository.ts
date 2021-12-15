import { UserModel } from "@/domain/models/user";
import { AddUserParams } from "@/domain/usecase/user/add-user";

export interface AddUserRepository {
    add(data: AddUserParams): Promise<UserModel>;
}
import { UserModel } from "@/domain/models/user";
import { UpdateUserParams } from "@/domain/usecase/user/update-user";

export interface UpdateUserRepository {
    update(data: UpdateUserParams): Promise<UserModel>;
}
import { UserModel } from "@/domain/models/user";

export interface FindUserRepository {
    find(cpf: number, name?: string): Promise<UserModel>
}
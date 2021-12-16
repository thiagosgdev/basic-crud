import { UserModel } from "@/domain/models/user";

export interface FindUser {
    find(cpf: number, name?: string): Promise<UserModel>
}
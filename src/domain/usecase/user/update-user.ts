import { UserModel } from "@/domain/models/user";
import { updateArrayBindingPattern } from "typescript";

export type UpdateUserParams = {
    name?: string, 
    cpf: number, 
    birthdate?: Date, 
    cellphone?: number,
    email?: string,
}

export interface UpdateUser{
    update(data: UpdateUserParams): Promise<UserModel>
}
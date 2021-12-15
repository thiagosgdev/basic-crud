import { UserModel } from "@/domain/models/user";

export type AddUserParams = {
    name: string, 
    cpf: number, 
    birthdate: Date, 
    cellphone: number,
    email: string,
}

export interface AddUser {
    add(data: AddUserParams): Promise<UserModel>;
}
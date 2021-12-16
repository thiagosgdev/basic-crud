import { UserModel } from "../models/user";
import { AddUserParams } from "../usecase/user/add-user";

export const mockAddUserParams = ():AddUserParams => ({
    name: "any_name", 
    cpf: 111111111, 
    birthdate: new Date, 
    cellphone: 123445678,
    email: "any_email@mail.com",
});

export const mockUserModel = ():UserModel => ({
    id: "any_id",
    name: "any_name", 
    cpf: 111111111, 
    birthdate: new Date, 
    cellphone: 123445678,
    email: "any_email@mail.com",
    created_at: new Date,
    updated_at: new Date,
});
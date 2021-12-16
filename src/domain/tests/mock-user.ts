import { UserModel } from "../models/user";
import { AddUserParams } from "../usecase/user/add-user";
import { UpdateUserParams } from "../usecase/user/update-user";

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

export const mockUsersModel = ():UserModel[] => [
    {
        id: "any_id",
        name: "any_name", 
        cpf: 111111111, 
        birthdate: new Date, 
        cellphone: 123445678,
        email: "any_email@mail.com",
        created_at: new Date,
        updated_at: new Date,
    },
    {
        id: "another_id",
        name: "another_name", 
        cpf: 22222222, 
        birthdate: new Date, 
        cellphone: 987654321,
        email: "another_email@mail.com",
        created_at: new Date,
        updated_at: new Date,
    }
];

export const mockUpdateUserParams = (): UpdateUserParams => ({
    name: "any_name", 
    cpf: 111111111, 
    birthdate: new Date, 
    cellphone: 123445678,
    email: "another_email@mail.com",
});
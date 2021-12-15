import { UserModel } from "@/domain/models/user";
import { AddUserParams } from "@/domain/usecase/user/add-user"
import { AddUserRepository } from "../protocols/add-user-repository";
import { DbAddUser } from "./db-add-user";
import MockDate from "mockdate";

const mockAddUserParams = ():AddUserParams => ({
    name: "any_name", 
    cpf: 111111111, 
    birthdate: new Date, 
    cellphone: 123445678,
    email: "any_email@mail.com",
});

const mockUserModel = ():UserModel => ({
    id: "any_id",
    name: "any_name", 
    cpf: 111111111, 
    birthdate: new Date, 
    cellphone: 123445678,
    email: "any_email@mail.com",
    created_at: new Date,
    updated_at: new Date,
});

const mockAddUserRepository = (): AddUserRepository => {
    class AddUserRepositoryStub implements AddUserRepository {
        async add(data: AddUserParams): Promise<UserModel> {
            return Promise.resolve(mockUserModel());
        }
    }
    return new AddUserRepositoryStub()
}
type SutTypes = {
    sut: DbAddUser,
    addUserStub: AddUserRepository
}

const makeSut = (): SutTypes => {
    const addUserStub = mockAddUserRepository();
    const sut = new DbAddUser(addUserStub);
    return {
        sut,
        addUserStub
    }
}

describe("Db Add User", () => {

    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    test("Should call AddUserRepository with the correct values", async () => {
        const { sut, addUserStub } = makeSut();
        const addSpy = jest.spyOn(addUserStub, "add");
        await sut.add(mockAddUserParams());
        expect(addSpy).toHaveBeenCalledWith(mockAddUserParams());
    });

    test("Should return the user on AddUserRepository success", async () => {
        const { sut } = makeSut();
        const user = await sut.add(mockAddUserParams());
        expect(user).toHaveProperty("id");
    });
});
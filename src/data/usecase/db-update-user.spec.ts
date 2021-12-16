import { UserModel } from "@/domain/models/user";
import { mockUserModel } from "@/domain/tests/mock-user";
import { UpdateUserParams } from "@/domain/usecase/user/update-user";
import { UpdateUserRepository } from "../protocols/update-user-repository";
import { DbUpdateUser } from "./db-update-user";
import MockDate from "mockdate";

const mockUpdateUserRepository = (): UpdateUserRepository => {
    class UpdateUserRepositoryStub implements UpdateUserRepository {
        update(data: UpdateUserParams): Promise<UserModel> {
            return Promise.resolve(mockUserModel());
        }
    }
    return new UpdateUserRepositoryStub();
}

const mockUpdateUserParams = (): UpdateUserParams => ({
    name: "any_name", 
    cpf: 111111111, 
    birthdate: new Date, 
    cellphone: 123445678,
    email: "another_email@mail.com",
});

type SutTypes = {
    sut: DbUpdateUser,
    updateUserStub: UpdateUserRepository
}

const makeSut = (): SutTypes => {
    const updateUserStub = mockUpdateUserRepository();
    const sut = new DbUpdateUser(updateUserStub);
    return {
        updateUserStub,
        sut
    }
}

describe(" Db Update User", () => {


    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    test("Should call UpdateUserRepository with the correct values", async () => {
        const { sut, updateUserStub } = makeSut();
        const updateSpy = jest.spyOn(updateUserStub, "update");
        await sut.update(mockUpdateUserParams())
        expect(updateSpy).toHaveBeenCalledWith(mockUpdateUserParams());
    })
});
import { UserModel } from "@/domain/models/user";
import { mockUpdateUserParams, mockUserModel } from "@/domain/tests/mock-user";
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
    });

    test("Should return the updated user on UpdateUserRepository success", async () => {
        const { sut } = makeSut();
        const user = await sut.update(mockUpdateUserParams())
        expect(user).toHaveProperty("id");
    });

    test("Should return null on UpdateUserRepository fail", async () => {
        const { sut, updateUserStub } = makeSut();
        jest.spyOn(updateUserStub, "update").mockReturnValueOnce(Promise.resolve(null));
        const user = await sut.update(mockUpdateUserParams());
        expect(user).toBeNull()
    });

    test("Should throw if UpdateUserRepository throws", async () => {
        const { sut, updateUserStub } = makeSut();
        jest.spyOn(updateUserStub, "update").mockReturnValueOnce(Promise.reject(new Error()));
        const user = sut.update(mockUpdateUserParams());
        await expect(user).rejects.toThrow();
    });
});
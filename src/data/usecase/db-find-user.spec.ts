import { UserModel } from "@/domain/models/user";
import { mockUserModel } from "@/domain/tests/mock-user";
import { FindUserRepository } from "../protocols/find-user-repository";
import { DbFindUser } from "./db-find-user";

const mockFindUser = (): FindUserRepository => {
    class FindUserRepositoryStub implements FindUserRepository {
        find(cpf: number, name: string): Promise<UserModel>{
            return Promise.resolve(mockUserModel());
        }
    }
    return new FindUserRepositoryStub();
}

type SutTypes = {
    sut: DbFindUser,
    findUserStub: FindUserRepository
}

const makeSut = (): SutTypes => {
    const findUserStub = mockFindUser();
    const sut = new DbFindUser(findUserStub);
    return {
        findUserStub,
        sut
    }
}
const cpf = 11111;
const name = "any_name";

describe("Db Find User", () => {
    test("Should call FindUserRepository with the correct values", async () => {
        const { sut, findUserStub } = makeSut();
        const findSpy = jest.spyOn(findUserStub, "find");
        await sut.find(cpf, name);
        expect(findSpy).toHaveBeenCalledWith(cpf, name);
    })
})
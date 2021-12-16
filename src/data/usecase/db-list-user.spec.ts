import { UserModel } from "@/domain/models/user";
import MockDate from "mockdate";
import { mockUsersModel } from "@/domain/tests/mock-user";
import { ListUsersRepository } from "../protocols/list-users-repository";
import { DbListUsers } from "./db-list-users";


const mockListUsersRepository = (): ListUsersRepository => {
    class ListUsersRepositoryStub implements ListUsersRepository {
        async list(): Promise<UserModel[]> {
            return Promise.resolve(mockUsersModel());
        }
    }
    return new ListUsersRepositoryStub()
}
type SutTypes = {
    sut: DbListUsers,
    listUsersStub: ListUsersRepository
}

const makeSut = (): SutTypes => {
    const listUsersStub = mockListUsersRepository();
    const sut = new DbListUsers(listUsersStub);
    return {
        sut,
        listUsersStub
    }
}

describe("Db List Users", () => {

    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    test("Should return the users on ListUsersRepository success", async () => {
        const { sut } = makeSut();
        const users = await sut.list();
        expect(users.length).toBe(2);
    });

    test("Should return null on ListUsersRepository fail", async () => {
        const { sut, listUsersStub} = makeSut();
        jest.spyOn(listUsersStub, "list").mockReturnValueOnce(Promise.resolve([]));
        const users = await sut.list();
        expect(users).toBeNull();
    });

});
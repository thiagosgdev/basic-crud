import { UserModel } from "@/domain/models/user";
import { mockUsersModel } from "@/domain/tests/mock-user";
import { ListUsers } from "@/domain/usecase/user/list-users";
import { ListUsersController } from "./list-users-controller";

const mockListUsers = (): ListUsers => {
    class ListUsersStub implements ListUsers {
        async list(): Promise<UserModel[]> {
            return Promise.resolve(mockUsersModel());
        }
    }
    return new ListUsersStub();
}

type SutTypes = {
    sut: ListUsersController,
    listUsersStub: ListUsers
}

const makeSut = ():SutTypes => {
    const listUsersStub = mockListUsers();
    const sut = new ListUsersController(listUsersStub);
    return {
        listUsersStub,
        sut,
    }
}

describe("List Users Controller", () => {
    test("Should return 200 on ListUsers success", async() => {
        const { sut } = makeSut();
        const response = await sut.handle();
        expect(response.statusCode).toBe(200);
    });

    test("Should return 204 on ListUsers fail", async() => {
        const { sut, listUsersStub } = makeSut();
        jest.spyOn(listUsersStub, "list").mockReturnValueOnce(Promise.resolve([]));
        const response = await sut.handle();
        expect(response.statusCode).toBe(204);
    });
})
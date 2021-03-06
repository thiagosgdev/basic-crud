import { UserModel } from "@/domain/models/user";
import { mockUserModel } from "@/domain/tests/mock-user";
import { FindUser } from "@/domain/usecase/user/find-user";
import { HttpRequest } from "../protocols";
import { FindUserController } from "./find-user-controller";


const makeFakeRequest = (): HttpRequest => ({
    params: {
        cpf: 1111111,
        name: "any_name"
    }
})

const mockFindUser = (): FindUser => {
    class FindUserStub implements FindUser {
        async find(cpf: number, name: string): Promise<UserModel>{
            return Promise.resolve(mockUserModel());
        }
    }
    return new FindUserStub();
}

type SutTypes = {
    sut: FindUserController,
    findUserStub: FindUser
}

const makeSut = (): SutTypes => {
    const findUserStub = mockFindUser();
    const sut = new FindUserController(findUserStub);
    return {
        findUserStub,
        sut
    }
}

describe("Find User Controller", () => {
    test("Should call FindUser with the correct values", async () => {
        const { sut, findUserStub } = makeSut();
        const findSpy = jest.spyOn(findUserStub, "find");
        await sut.handle(makeFakeRequest());
        expect(findSpy).toHaveBeenCalledWith(
            1111111,
            "any_name"
        );
    });

    test("Should return 200 on FindUser success", async () => {
        const { sut } = makeSut();
        const response = await sut.handle(makeFakeRequest());
        expect(response.statusCode).toBe(200);
    });

    test("Should return 204 on FindUser fail", async () => {
        const { sut, findUserStub } = makeSut();
        jest.spyOn(findUserStub, "find").mockReturnValueOnce(Promise.resolve(null));
        const response = await sut.handle(makeFakeRequest());
        expect(response.statusCode).toBe(204);
    });

    test("Should return 500 if FindUser throws", async () => {
        const { sut, findUserStub } = makeSut();
        jest.spyOn(findUserStub, "find").mockReturnValueOnce(Promise.reject(new Error()));
        const response = await sut.handle(makeFakeRequest());
        expect(response.statusCode).toBe(500);
    });
});
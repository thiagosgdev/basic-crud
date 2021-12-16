import { DeleteUser } from "@/domain/usecase/user/delete-user"
import { response } from "express";
import { HttpRequest } from "../protocols";
import { DeleteUserController } from "./delete-user-controller";

const makeFakeRequest = (): HttpRequest => ({
    body: {
        cpf: 1111111
    }
})

const mockDeleteUser = (): DeleteUser => {
    class DeleteUserStub implements DeleteUser {
        async delete(cpf: number): Promise<void>{

        }
    }
    return new DeleteUserStub();
}

type SutTypes = {
    sut: DeleteUserController,
    deleteUserStub: DeleteUser
}

const makeSut = (): SutTypes => {
    const deleteUserStub = mockDeleteUser();
    const sut = new DeleteUserController(deleteUserStub);
    return {
        sut,
        deleteUserStub
    }
}

describe("Delete User Controller", () => {
    test("Should call DeleteUser with the correct value", async () => {
        const { sut, deleteUserStub } = makeSut();
        const deleteSpy = jest.spyOn(deleteUserStub, "delete");
        await sut.handle(makeFakeRequest());
        expect(deleteSpy).toHaveBeenCalledWith(1111111)
    });

    test("Should return 200 on DeleteUser response", async () => {
        const { sut } = makeSut();
        const response = await sut.handle(makeFakeRequest());
        expect(response.statusCode).toBe(200);
    });

    test("Should return 500 if DeleteUser throws", async () => {
        const { sut, deleteUserStub } = makeSut();
        jest.spyOn(deleteUserStub, "delete").mockReturnValueOnce(Promise.reject(new Error()));
        const response = await sut.handle(makeFakeRequest());
        expect(response.statusCode).toBe(500);
    });
});
import { DeleteUser } from "@/domain/usecase/user/delete-user"
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
    })
})
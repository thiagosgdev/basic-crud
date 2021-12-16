import { DeleteUserRepository } from "../protocols/delete-user-repository";
import { DbDeleteUser } from "./db-delete-user";


const mockDeleteUser = (): DeleteUserRepository => {
    class DeleteUserRepositoryStub implements DeleteUserRepository {
        async delete(cpf: number): Promise<void>{
            
        }
    }
    return new DeleteUserRepositoryStub();
}

type SutTypes = {
    sut: DbDeleteUser,
    deleteUserStub: DeleteUserRepository
}

const makeSut = (): SutTypes => {
    const deleteUserStub = mockDeleteUser();
    const sut = new DbDeleteUser(deleteUserStub);
    return {
        deleteUserStub,
        sut
    }
}

describe("Db Delete User", () => {
    test("Should call DeleteUserRepository with the correct values", async () => {
        const { sut, deleteUserStub } = makeSut();
        const deleteSpy = jest.spyOn(deleteUserStub, "delete");
        await sut.delete(1111111);
        expect(deleteSpy).toHaveBeenCalledWith(1111111);
    });

    test("Should throw if DeleteUserRepository throws", async () => {
        const { sut, deleteUserStub } = makeSut();
        jest.spyOn(deleteUserStub, "delete").mockReturnValueOnce(Promise.reject(new Error()));
        const promise = sut.delete(1111111);
        await expect(promise).rejects.toThrow();
    });
});
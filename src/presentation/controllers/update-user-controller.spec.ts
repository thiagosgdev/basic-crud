import { UserModel } from "@/domain/models/user";
import { mockUserModel } from "@/domain/tests/mock-user";
import { UpdateUser, UpdateUserParams } from "@/domain/usecase/user/update-user";
import { HttpRequest } from "../protocols";
import { UpdateUserController } from "./update-user-controller";
import MockDate from "mockdate";

const makeFakeRequest = (): HttpRequest => ({
    body: {
        name: "any_name", 
        cpf: 111111111, 
        birthdate: new Date, 
        cellphone: 123445678,
        email: "another_email@mail.com",
    }
})

const mockUpdateUser = (): UpdateUser => {
    class UpdateUserStub implements UpdateUser {
        update(data: UpdateUserParams): Promise<UserModel>{
            return Promise.resolve(mockUserModel());
        }
    }
    return new UpdateUserStub();
}

type SutTypes = {
    sut: UpdateUserController,
    updateUserStub: UpdateUser
}

const makeSut = ():SutTypes => {
    const updateUserStub = mockUpdateUser();
    const sut = new UpdateUserController(updateUserStub);
    return {
        updateUserStub,
        sut
    }
}

describe("Update User Controller", () => {

    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });


    test("Should call UpdateUser with the correct values", async () => {
        const { sut, updateUserStub } = makeSut();
        const updateSpy = jest.spyOn(updateUserStub, "update");
        await sut.handle(makeFakeRequest());
        expect(updateSpy).toHaveBeenCalledWith({
            name: "any_name", 
            cpf: 111111111, 
            birthdate: new Date, 
            cellphone: 123445678,
            email: "another_email@mail.com",
        });
    });

    test("Should return 200 on UpdateUser success", async () => {
        const { sut } = makeSut();
        const response = await sut.handle(makeFakeRequest());
        expect(response.statusCode).toBe(200);
    })
})
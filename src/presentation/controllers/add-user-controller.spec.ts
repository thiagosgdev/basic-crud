import { UserModel } from "@/domain/models/user";
import { mockAddUserParams, mockUserModel } from "@/domain/tests/mock-user";
import { AddUser, AddUserParams } from "@/domain/usecase/user/add-user";
import { HttpRequest } from "../protocols";
import { AddUserController } from "./add-user-controller";
import MockDate from "mockdate";
import { Validation } from "../protocols/validation";
import { MissingParamError } from "../errors/missing-param-error";

const makeFakeRequest = (): HttpRequest => ({
    body : {
        name: "any_name", 
        cpf: 111111111, 
        birthdate: new Date, 
        cellphone: 123445678,
        email: "any_email@mail.com",
    }
})

const mockAddUser = (): AddUser => {
    class AddUserStub implements AddUser {
        async add(data: AddUserParams): Promise<UserModel> {
            return Promise.resolve(mockUserModel());
        }
    }
    return new AddUserStub();
}

const mockValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error{
            return null;
        }        
    }
    return new ValidationStub
}

type SutTypes = {
    sut: AddUserController,
    addUserStub: AddUser,
    validationStub: Validation
}

const makeSut = (): SutTypes => {
    const addUserStub = mockAddUser();
    const validationStub = mockValidation();
    const sut = new AddUserController(addUserStub, validationStub);
    return {
        addUserStub,
        validationStub,
        sut
    }
}

describe(" Add User Controller ", () => {

    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    test("Should call AddUser with the correct values", async () => {
        const { sut, addUserStub } = makeSut();
        const addSpy = jest.spyOn(addUserStub, "add");
        await sut.handle(makeFakeRequest());
        expect(addSpy).toHaveBeenCalledWith(mockAddUserParams());
    });

    test("Should return 201 on AddUser success", async () => {
        const { sut } = makeSut();
        const response = await sut.handle(makeFakeRequest());
        expect(response.statusCode).toBe(201);
    });

    test("Should return 200 on AddUser fail", async () => {
        const { sut, addUserStub } = makeSut();
        jest.spyOn(addUserStub, "add").mockReturnValueOnce(Promise.resolve(null));
        const response = await sut.handle(makeFakeRequest());
        expect(response.statusCode).toBe(200);
    });

    test("Should return 500 if AddUser throws", async () => {
        const { sut, addUserStub } = makeSut();
        jest.spyOn(addUserStub, "add").mockReturnValueOnce(Promise.reject(new Error()));
        const response = await sut.handle(makeFakeRequest());
        expect(response.statusCode).toBe(500);
    });

    test("Should call Validation with the correct values", async () => {
        const { sut, validationStub } = makeSut();
        const validateSpy = jest.spyOn(validationStub, "validate");
        await sut.handle(makeFakeRequest());
        expect(validateSpy).toHaveBeenCalledWith({
            name: "any_name", 
            cpf: 111111111, 
            birthdate: new Date, 
            cellphone: 123445678,
            email: "any_email@mail.com",
        });
    });

    test("Should return 400 on Validation fail", async () => {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, "validate").mockReturnValueOnce(new MissingParamError("missing_field"));
        const response = await sut.handle(makeFakeRequest());
        expect(response.statusCode).toBe(400);
    });
});
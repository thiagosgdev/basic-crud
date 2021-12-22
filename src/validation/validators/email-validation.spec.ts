import { EmailValidator } from "../protocols/email-validator";
import { EmailValidation } from "./email-validation";


const mockEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true;
        }
    }
    return new EmailValidatorStub;
}

type SutTypes = {
    emailValidatorStub: EmailValidator,
    sut: EmailValidation
}

const makeSut = (): SutTypes => {
    const emailValidatorStub = mockEmailValidator();
    const sut = new EmailValidation("email", emailValidatorStub);
    return {
        emailValidatorStub,
        sut
    }
}

describe("Email Validation", () => {
    test("Should call EmailValidator with the correct values", () => {
        const { emailValidatorStub, sut } = makeSut();
        const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
        sut.validate({email: "any_email@mail.com"});
        expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com");
    });
});
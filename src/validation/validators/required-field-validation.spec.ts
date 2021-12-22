import { MissingParamError } from "@/presentation/errors/missing-param-error";
import { RequiredFieldValidation } from "./required-field-validation";


type SutTypes = {
    sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
    const sut = new RequiredFieldValidation("field");
    return {
        sut
    }
}

describe("Required Field Validation", () => {
    test("Should not return on Validation success", async () => {
        const { sut } = makeSut();
        const validation = sut.validate({field: "any_name"})
        expect(validation).toBeFalsy();
    });

    test('Should return a MissingParamError if validation fails', () => {
        const { sut } =  makeSut();
        const error = sut.validate({wrong: "any_name"});
        expect(error).toEqual(new MissingParamError("field"));
    });
});
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
    })
});
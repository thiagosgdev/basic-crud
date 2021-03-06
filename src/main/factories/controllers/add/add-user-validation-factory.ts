import { EmailValidatorAdapter } from "@/main/validators/e-mail-validator-adapter";
import { Validation } from "@/presentation/protocols/validation";
import { EmailValidation } from "@/validation/validators/email-validation";
import { RequiredFieldValidation } from "@/validation/validators/required-field-validation";
import { ValidationComposite } from "@/validation/validators/validation-composite";


export const makeAddUserValidation = (): ValidationComposite => {
    const validations: Validation[] = [];
    for(const field of ["name", "cpf", "birthdate", "cellphone", "email"]){
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation("email", new EmailValidatorAdapter()));

    return new ValidationComposite(validations);
} 
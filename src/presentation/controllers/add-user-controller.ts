import { AddUser, AddUserParams } from "@/domain/usecase/user/add-user";
import { Controller, HttpRequest, HttpResponse } from "../protocols";
import { Validation } from "../protocols/validation";

export class AddUserController implements Controller {

    constructor(
        private readonly addUser: AddUser,
        private readonly validation: Validation
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const data: AddUserParams  = httpRequest.body;
            const validationError = this.validation.validate(httpRequest.body);

            if(validationError){
                return {
                    statusCode: 400,
                    body: validationError
                }
            }
            
            const user = await this.addUser.add(data);
            if(user){
                return {
                    statusCode: 201,
                    body: user
                }
            }
            return {
                statusCode: 200,
                body: "ERROR ADD USER - Check the values informed!"
            }
        }catch(error){
            return {
                statusCode: 500,
                body: {
                    message: "Internal Server Error! Contact the admin!"
                }
            }
        }
        
    }
}
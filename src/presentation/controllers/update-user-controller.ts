import { UpdateUser, UpdateUserParams } from "@/domain/usecase/user/update-user";
import { Controller, HttpRequest, HttpResponse } from "../protocols";


export class UpdateUserController implements Controller {

    constructor(
        private readonly updateUser: UpdateUser
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try{
            const data: UpdateUserParams = httpRequest.body;
            const updatedUser = await this.updateUser.update(data);
            if(updatedUser){
                return {
                    statusCode: 200,
                    body: updatedUser
                }
            }
            return {
                statusCode: 204,
                body: "Check the user information!"
            }
        }catch(error){
            return {
                statusCode: 500,
                body: "Server internal error!"
            }
        }
        
    }
}
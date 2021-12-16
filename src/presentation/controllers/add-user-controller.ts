import { AddUser, AddUserParams } from "@/domain/usecase/user/add-user";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class AddUserController implements Controller {

    constructor(
        private readonly addUser: AddUser
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const  data: AddUserParams  = httpRequest.body;
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
                body: "Internal Server Error! Contact the admin!"
            }
        }
        
    }
}
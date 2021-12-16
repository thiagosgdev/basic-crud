import { AddUser, AddUserParams } from "@/domain/usecase/user/add-user";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class AddUserController implements Controller {

    constructor(
        private readonly addUser: AddUser
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const  data: AddUserParams  = httpRequest.body;
        const user = await this.addUser.add(data);
        if(user){
            return {
                statusCode: 201,
                body: user
            }
        }
        return null;
    }
}
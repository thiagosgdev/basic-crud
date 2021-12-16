import { UserModel } from "@/domain/models/user";
import { ListUsers } from "@/domain/usecase/user/list-users";
import { Controller, HttpResponse } from "../protocols";


export class ListUsersController implements Controller {

    constructor(
        private readonly listUsers: ListUsers
    ){}

    async handle(): Promise<HttpResponse> {
        try {
            const users = await this.listUsers.list();
            if(users.length > 0){
                return {
                    statusCode: 200,
                    body: users
                };
            }
            return {
                statusCode: 204,
                body: "No data found!"
            }
        }catch(error){
            return {
                statusCode: 500,
                body: {
                    message: "Internal Server Error!"
                }
            }
        }

    }
}
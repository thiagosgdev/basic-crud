import { DeleteUser } from "@/domain/usecase/user/delete-user";
import { Controller, HttpRequest, HttpResponse } from "../protocols";


export class DeleteUserController implements Controller {
    
    constructor(
        private readonly deleteUser: DeleteUser
    ){}
    
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { cpf } = httpRequest.body;
        await this.deleteUser.delete(cpf);
        return {
            statusCode: 200,
            body: {
                message: "Request completed"
            }
        }
    }
}
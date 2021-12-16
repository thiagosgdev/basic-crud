import { FindUser } from "@/domain/usecase/user/find-user";
import { Controller, HttpRequest, HttpResponse } from "../protocols";


export class FindUserController implements Controller {
    
    constructor(
        private readonly findUser: FindUser
    ){}
    
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {cpf, name } = httpRequest.body;
        const user = await this.findUser.find(cpf, name);
        return {
            statusCode: 200,
            body: user
        };
    }
}
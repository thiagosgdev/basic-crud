import { FindUser } from "@/domain/usecase/user/find-user";
import { Controller, HttpRequest, HttpResponse } from "../protocols";


export class FindUserController implements Controller {
    
    constructor(
        private readonly findUser: FindUser
    ){}
    
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {cpf, name } = httpRequest.body;
        await this.findUser.find(cpf, name);
        return null;
    }
}
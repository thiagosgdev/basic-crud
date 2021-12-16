import { FindUser } from "@/domain/usecase/user/find-user";
import { Controller, HttpRequest, HttpResponse } from "../protocols";


export class FindUserController implements Controller {
    
    constructor(
        private readonly findUser: FindUser
    ){}
    
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const {cpf, name } = httpRequest.body;
            const user = await this.findUser.find(cpf, name);
            if(user){
                return {
                    statusCode: 200,
                    body: user
                };
            }
            return {
                statusCode: 204,
                body: "Verify the cpf and/or name"
            };
        }catch(error){
            return {
                statusCode: 500,
                body: "Internal Server Error"
            };
        }

    }
}
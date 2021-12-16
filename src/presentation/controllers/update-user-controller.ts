import { UpdateUser, UpdateUserParams } from "@/domain/usecase/user/update-user";
import { Controller, HttpRequest, HttpResponse } from "../protocols";


export class UpdateUserController implements Controller {

    constructor(
        private readonly updateUser: UpdateUser
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const data: UpdateUserParams = httpRequest.body;
        await this.updateUser.update(data);
        return null
    }
}
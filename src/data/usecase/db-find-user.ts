import { UserModel } from "@/domain/models/user";
import { FindUser } from "@/domain/usecase/user/find-user";
import { FindUserRepository } from "../protocols/find-user-repository";


export class DbFindUser implements FindUserRepository {
    constructor(
        private readonly findUserRepository: FindUserRepository
    ){}

    async find(cpf: number, name?: string): Promise<UserModel> {
        await this.findUserRepository.find(cpf, name);
        return null
    }
}
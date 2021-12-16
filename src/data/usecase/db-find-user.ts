import { UserModel } from "@/domain/models/user";
import { FindUserRepository } from "../protocols/find-user-repository";


export class DbFindUser implements FindUserRepository {
    constructor(
        private readonly findUserRepository: FindUserRepository
    ){}

    async find(cpf: number, name?: string): Promise<UserModel> {
        const user =await this.findUserRepository.find(cpf, name);
        if(user) {
            return user;
        }
        return null;
    }
}
import { UserModel } from "@/domain/models/user";
import { AddUserParams } from "@/domain/usecase/user/add-user";
import { AddUserRepository } from "../protocols/add-user-repository";


export class DbAddUser implements AddUserRepository {

    constructor(
        private readonly addUserRepository: AddUserRepository
    ){}
    async add(data: AddUserParams): Promise<UserModel> {
        const user = await this.addUserRepository.add(data);
        return user;
    }
}
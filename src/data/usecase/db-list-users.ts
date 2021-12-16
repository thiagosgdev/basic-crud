import { UserModel } from "@/domain/models/user";
import { ListUsersRepository } from "../protocols/list-users-repository";

export class DbListUsers implements ListUsersRepository {

    constructor(
        private readonly listUsersRepository: ListUsersRepository
    ){}

    async list(): Promise<UserModel[]> {
        const users = await this.listUsersRepository.list();
        if(users.length > 0){
            return users;
        }
        return null;
    }
}
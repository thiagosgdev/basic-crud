import { UserModel } from "@/domain/models/user";
import { UpdateUserParams } from "@/domain/usecase/user/update-user";
import { UpdateUserRepository } from "../protocols/update-user-repository";

export class DbUpdateUser implements UpdateUserRepository {
    
    constructor(
        private readonly updateUserRepository: UpdateUserRepository
    ){}

    async update(data: UpdateUserParams): Promise<UserModel>{
        const user = await this.updateUserRepository.update(data);
        return user;
    }
}
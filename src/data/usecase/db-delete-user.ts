import { DeleteUserRepository } from "../protocols/delete-user-repository";


export class DbDeleteUser implements DeleteUserRepository{

    constructor(
        private readonly deleteUserRepository: DeleteUserRepository
    ){}
    async delete(cpf: number): Promise<void> {
        await this.deleteUserRepository.delete(cpf);
        return null;
    }
}
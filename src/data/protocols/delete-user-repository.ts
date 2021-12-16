
export interface DeleteUserRepository {
    delete(cpf: number): Promise<void>
}
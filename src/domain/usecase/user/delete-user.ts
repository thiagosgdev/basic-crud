
export interface DeleteUser {
    delete(cpf: number):Promise<void>;
}
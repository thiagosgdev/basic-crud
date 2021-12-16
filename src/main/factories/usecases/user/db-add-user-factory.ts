import { DbAddUser } from "@/data/usecase/db-add-user";
import { AddUser } from "@/domain/usecase/user/add-user";
import { UserPostgresRepository } from "@/infra/db/postgres/user-postgres-repository";

export const makeDbAddUser = (): AddUser => {
    const userPostgresRepository = new UserPostgresRepository();
    
    return new DbAddUser(userPostgresRepository);   
}
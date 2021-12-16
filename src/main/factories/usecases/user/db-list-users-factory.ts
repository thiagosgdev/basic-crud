import { DbAddUser } from "@/data/usecase/db-add-user";
import { DbListUsers } from "@/data/usecase/db-list-users";
import { ListUsers } from "@/domain/usecase/user/list-users";
import { UserPostgresRepository } from "@/infra/db/postgres/user-postgres-repository";

export const makeDbListUsers = (): ListUsers => {
    const userPostgresRepository = new UserPostgresRepository();
    
    return new DbListUsers(userPostgresRepository);   
}
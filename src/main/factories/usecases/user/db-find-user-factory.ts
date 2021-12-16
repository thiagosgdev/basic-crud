import { DbFindUser } from "@/data/usecase/db-find-user";
import { FindUser } from "@/domain/usecase/user/find-user";
import { UserPostgresRepository } from "@/infra/db/postgres/user-postgres-repository";


export const makeDbFindUser = (): FindUser => {
    const userPostgresRepository = new UserPostgresRepository();
    
    return new DbFindUser(userPostgresRepository);   
}
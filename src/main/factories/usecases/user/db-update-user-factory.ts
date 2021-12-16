import { DbUpdateUser } from "@/data/usecase/db-update-user";
import { UpdateUser } from "@/domain/usecase/user/update-user";
import { UserPostgresRepository } from "@/infra/db/postgres/user-postgres-repository";

export const makeDbUpdateUser = (): UpdateUser => {
    const userPostgresRepository = new UserPostgresRepository();
    
    return new DbUpdateUser(userPostgresRepository);   
}
import { DbDeleteUser } from "@/data/usecase/db-delete-user";
import { UserPostgresRepository } from "@/infra/db/postgres/user-postgres-repository";

export const makeDbDeleteUser = (): DbDeleteUser => {
    const userPostgresRepository = new UserPostgresRepository();
    return new DbDeleteUser(userPostgresRepository);   
}
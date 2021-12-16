import { mockAddUserParams } from "@/domain/tests/mock-user";
import { connection } from "./helpers/typeorm";
import { UserPostgresRepository } from "./user-postgres-repository";

const makeSut = () => {
    const sut = new UserPostgresRepository();
    return {
        sut
    }
}

describe("User Postgres Repository", () => {
    
    beforeAll(async () => {
        let migrations = await connection.create();
        await migrations.runMigrations();
    });

    beforeEach(async () => {
        await connection.clear();
    });
    afterAll(async () => {
        await connection.clear();
        await connection.close();
    });

    test("Should return the user on add() success", async () => {
        const { sut } = makeSut();
        const user = await sut.add(mockAddUserParams());
        expect(user).toHaveProperty("id");
    })
});
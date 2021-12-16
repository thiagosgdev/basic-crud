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
    });

    test("Should return null on add() fail", async () => {
        const { sut } = makeSut();
        jest.spyOn(sut, "add").mockReturnValueOnce(Promise.resolve(null));
        const user = await sut.add(mockAddUserParams());
        expect(user).toBeNull()
    });

    test("Should throw if add() throws", async () => {
        const { sut } = makeSut();
        jest.spyOn(sut, "add").mockReturnValueOnce(Promise.reject(new Error()));
        const user = sut.add(mockAddUserParams());
        await expect(user).rejects.toThrow();
    });

    test("Should return the users on list() success", async () => {
        const { sut } = makeSut();
        await sut.add(mockAddUserParams());
        await sut.add(mockAddUserParams());
        const users = await sut.list();
        expect(users.length).toBe(2);
        expect(users[0]).toHaveProperty("id");
        expect(users[1]).toHaveProperty("id");
    });
});
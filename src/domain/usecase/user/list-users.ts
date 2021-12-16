import { UserModel } from "@/domain/models/user";

export interface ListUsers {
    list(): Promise<UserModel[]>;
}
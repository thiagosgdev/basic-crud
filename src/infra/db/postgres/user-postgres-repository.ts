import { User } from "@/domain/entities/user";
import { UserModel } from "@/domain/models/user";
import { AddUser, AddUserParams } from "@/domain/usecase/user/add-user";
import { FindUser } from "@/domain/usecase/user/find-user";
import { ListUsers } from "@/domain/usecase/user/list-users";
import { getRepository, Repository } from "typeorm";


export class UserPostgresRepository implements AddUser, ListUsers, FindUser{
    private readonly repository: Repository<User>
    constructor(){
        this.repository = getRepository(User);
    }

    async add(data: AddUserParams):Promise<UserModel> {
        const user = this.repository.create(data);
        await this.repository.save(user);
        if(user){
            return user;
        }
        return null;
    }

    async list(): Promise<UserModel[]> {
        const users = await this.repository.find();
        if(users.length > 0){
            return users;
        }
        return null;
    }

    async find(cpf: number, name?: string): Promise<UserModel> {
        if(name){
            const user = await this.repository.findOne({cpf, name})
        }
        const user = await this.repository.findOne({cpf})
        return user;
    }
}
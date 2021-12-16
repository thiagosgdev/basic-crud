import { User } from "@/domain/entities/user";
import { UserModel } from "@/domain/models/user";
import { AddUser, AddUserParams } from "@/domain/usecase/user/add-user";
import { DeleteUser } from "@/domain/usecase/user/delete-user";
import { FindUser } from "@/domain/usecase/user/find-user";
import { ListUsers } from "@/domain/usecase/user/list-users";
import { UpdateUser, UpdateUserParams } from "@/domain/usecase/user/update-user";
import { getRepository, Repository } from "typeorm";


export class UserPostgresRepository implements AddUser, ListUsers, FindUser, UpdateUser, DeleteUser{
   
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
        let user: UserModel;
        if(!name){
            user = await this.repository.findOne({cpf})
        }else {
            user = await this.repository.findOne({cpf, name})
        }
        if(user){
            return user;
        }
        return null;        
    }

    async update(data: UpdateUserParams): Promise<UserModel> {
        const user = await this.repository.findOne({cpf: data.cpf});
        if(!user){
            return null;
        }
        const updatedUser = await this.repository.save({...user, ...data});
        return updatedUser;
    }

    async delete(cpf: number): Promise<void> {
        await this.repository.delete({cpf});
    }
}
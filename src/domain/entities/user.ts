import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    cpf: number;

    @Column()
    birthdate: Date;

    @Column()
    cellphone: number;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}
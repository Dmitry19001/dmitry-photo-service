import { User } from "../../users/entities/user.entity";
import {Column, Entity, PrimaryGeneratedColumn, OneToOne} from "typeorm"
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gender: string;

    @Column()
    photo: string;

    @OneToOne(() => User, (user) => user.profile)
    user: User;
}
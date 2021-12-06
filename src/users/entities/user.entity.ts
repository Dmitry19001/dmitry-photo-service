import { Profile } from "../../profiles/entities/profile.entity";
import { Photo } from "../../photos/entities/photo.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
//import { IsEmail } from "class-validator";

@Entity()
export class User{ 
    @PrimaryGeneratedColumn()
    id: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @OneToOne(() => Profile, (profile) => profile.user)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Photo, (photo) => photo.user)
    photos?: Photo[];
}
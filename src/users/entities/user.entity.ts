import { Profile } from "../../profiles/entities/profile.entity";
import { Photo } from "../../photos/entities/photo.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{ 
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
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
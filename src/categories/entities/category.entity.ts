import { Photo } from "../../photos/entities/photo.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category{ 
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => Photo, (photo) => photo.categories)
    photos: Photo[];
}
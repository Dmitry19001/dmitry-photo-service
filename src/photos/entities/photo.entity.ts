import { User } from "../../users/entities/user.entity";
import { Category } from "../../categories/entities/category.entity";
import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable} from "typeorm"

@Entity()
export class Photo{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    description: string;
    
    @Column()
    url: string;

    @ManyToOne(() => User, (user) => user.photos)
    user: User;

    @ManyToMany(() => Category, (category) => category.photos,
     { cascade: true })   
    @JoinTable()
    categories: Category[];
}
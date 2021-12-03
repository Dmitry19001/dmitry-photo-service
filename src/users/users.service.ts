import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly profilesService: ProfilesService) {}

    async isnertUserWithProfile(createUserDto: CreateUserDto){
        const profile = await this.profilesService.insertProfile(
            createUserDto.profile.gender, 
            createUserDto.profile.photo
        );

        const user = new User();
        user.name = createUserDto.name;
        user.username = createUserDto.username;
        user.password = createUserDto.password;
        user.profile = profile;

        return await this.usersRepository.save(user);
    }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find({relations: ["profile"]});
    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        return await this.usersRepository.findOne(username, {relations: ["profile"]});
    }

    async getUserById(id: string): Promise<User | undefined> {
        return await this.usersRepository.findOne(id, {relations: ["profile"]});
    }

    async deleteUser(id: string): Promise<User> {
        const user = await this.usersRepository.findOneOrFail(id);
        let profile = null;

        if (user && user.profile){
            profile = await this.profilesService.deleteProfile(id);
            
        }
        const status = await this.usersRepository.delete(id);
        return user;
    }
}

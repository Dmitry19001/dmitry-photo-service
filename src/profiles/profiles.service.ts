import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private readonly profilesRepository: Repository<Profile>) {}
    async insertProfile(gender: string, photo: string): Promise<Profile> {
        const profile = new Profile();
        profile.gender = gender;
        profile.photo = photo;

        return await this.profilesRepository.save(profile);
    }

    async getProfileById(id: string): Promise<Profile> {
        const profile = await this.profilesRepository.findOneOrFail(id, {relations: ["user"]})
        return profile;
    }

    async deleteProfile(id: string): Promise<Profile> {
        const profile = await this.profilesRepository.findOneOrFail(id);
        const status = await this.profilesRepository.delete(id)

        return profile;
    }
}

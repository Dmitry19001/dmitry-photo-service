import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {

    constructor(
        @InjectRepository(Photo) private readonly photosRepository: Repository<Photo>,
        private readonly usersService: UsersService) {}

    async insertPhoto(createPhotoDto: CreatePhotoDto){
        const user = await this.usersService.getUserById(createPhotoDto.user.id);
        const photo = new Photo();
        photo.name = createPhotoDto.name;
        photo.description = createPhotoDto.description;
        photo.user = user;

        return await this.photosRepository.save(photo);
    }

    async getPhotos(): Promise<Photo[]> {
        return await this.photosRepository.find({relations: ["user"]});
    }

}

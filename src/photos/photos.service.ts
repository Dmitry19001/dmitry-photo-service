import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {
    constructor(
        @InjectRepository(Photo) private readonly photosRepository: Repository<Photo>,
        private readonly usersService: UsersService,
        private readonly categoriesService: CategoriesService) {}

    async insertPhoto(createPhotoDto: CreatePhotoDto){
        const user = await this.usersService.getUserByUsername(createPhotoDto.user.username);
        
        //Searching for categories
        let categories = [];
        for (let i = 0; i < createPhotoDto.categories.length; i++)
        {
            let categoryName = createPhotoDto.categories[i];
            let category = await this.categoriesService.getCategoryByName(categoryName);
            
            if (category){
                categories.push(category);
            } else {
                console.log('Category ' + categoryName + ' not found!');
            }
        }

        //Creating new phtoto
        const photo = new Photo();
        photo.name = createPhotoDto.name;
        photo.description = createPhotoDto.description;
        photo.url = createPhotoDto.url;
        photo.user = user;
        photo.categories = categories;

        return await this.photosRepository.save(photo);
    }

    async getPhotos(): Promise<Photo[]> {
        return await this.photosRepository.find({relations: ["categories"]});
    }

    async getPhotoById(id:string): Promise<Photo> {
        return await this.photosRepository.findOne(id, {relations: ["categories"]});
    }

    async deletePhoto(id: string): Promise<Photo> {
        const photo = await this.photosRepository.findOne(id);
        const status = await this.photosRepository.delete(id);
        return await photo;
    }

}

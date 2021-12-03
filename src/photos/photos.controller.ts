import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
    constructor(private photosService: PhotosService){}

    @Post()
    async createPhoto(@Body() createPhotoDto: CreatePhotoDto) : Promise<Photo>{
        return this.photosService.insertPhoto(createPhotoDto)
    }

    @Get()
    async getPhotos(): Promise<Photo[]>{
        return await this.photosService.getPhotos();
    }

    @Delete(':id')
    async deleteUser( @Param('id') id:string ) : Promise<Photo> {
        return await this.photosService.deletePhoto(id);
    }
}

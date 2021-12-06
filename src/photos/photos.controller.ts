import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
    constructor(private photosService: PhotosService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createPhoto(@Body() createPhotoDto: CreatePhotoDto) : Promise<Photo>{
        return this.photosService.insertPhoto(createPhotoDto)
    }

    @Get()
    async getPhotos(): Promise<Photo[]>{
        return await this.photosService.getPhotos();
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteUser( @Param('id') id:string ) : Promise<Photo> {
        return await this.photosService.deletePhoto(id);
    }
}

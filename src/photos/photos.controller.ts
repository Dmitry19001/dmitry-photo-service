import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';
import { PhotosService } from './photos.service';

@ApiTags('photos')
@Controller('photos')
export class PhotosController {
    constructor(private photosService: PhotosService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create new photo' })
    @ApiResponse({ status: 401, description: 'Access denied! Log in first!' })
    async createPhoto(@Body() createPhotoDto: CreatePhotoDto) : Promise<Photo>{
        return this.photosService.insertPhoto(createPhotoDto)
    }

    @Get()
    @ApiOperation({ summary: 'Get all existing photos' })
    async getPhotos(): Promise<Photo[]>{
        return await this.photosService.getPhotos();
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 401, description: 'Access denied! Log in first!' })
    @ApiOperation({ summary: 'Delete photo by ID' })
    async deleteUser( @Param('id') id:string ) : Promise<Photo> {
        return await this.photosService.deletePhoto(id);
    }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';

@Module({
    imports: [ TypeOrmModule.forFeature([Photo])],
    providers: [PhotosService],
    controllers: [PhotosController]
})
export class PhotosModule {}

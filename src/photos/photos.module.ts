import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { UsersModule } from 'src/users/users.module';
import { Photo } from './entities/photo.entity';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';

@Module({
    imports: [ TypeOrmModule.forFeature([Photo]), UsersModule, CategoriesModule],
    providers: [PhotosService],
    controllers: [PhotosController],
    exports: [PhotosService]
})
export class PhotosModule {}

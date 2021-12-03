import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PhotosModule } from './photos/photos.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, ProfilesModule, PhotosModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

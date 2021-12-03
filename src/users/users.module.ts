import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ TypeOrmModule.forFeature([User]), ProfilesModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) : Promise<User>{
        return await this.usersService.isnertUserWithProfile(createUserDto)
    }

    @Get()
    async getUser(){
        return await this.usersService.getUsers();
    }
}

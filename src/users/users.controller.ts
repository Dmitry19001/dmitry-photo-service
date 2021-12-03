import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
    async getUsers(){
        return await this.usersService.getUsers();
    }

    @Get(':id')
    async getUser( @Param('id') id:string ) : Promise<User> {
        return await this.usersService.getUserById(id);
    }

    @Delete(':id')
    async delteUser( @Param('id') id:string ) : Promise<User> {
        return await this.usersService.deleteUser(id);
    }
}

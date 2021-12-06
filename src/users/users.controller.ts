import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiCreatedResponse({
         description: "User has been created successfully",
         type: User
    })
    @ApiResponse({ status: 500, description: 'Username already exsists' })
    async createUser(@Body() createUserDto: CreateUserDto) : Promise<User>{
        return await this.usersService.isnertUserWithProfile(createUserDto)
    }

    @Get()
    //@UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all users [DISABLED SECURITY FOR TEST]' })
    @ApiResponse({ status: 401, description: 'Access denied! Log in first!' })
    async getUsers(){
        return await this.usersService.getUsers();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 401, description: 'Access denied! Log in first!' })
    async getUser( @Param('id') id:string ) : Promise<User> {
        return await this.usersService.getUserById(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiResponse({ status: 401, description: 'Access denied! Log in first!' })
    async delteUser( @Param('id') id:string ) : Promise<User> {
        return await this.usersService.deleteUser(id);
    }
}

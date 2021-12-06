import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Profile } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService){}

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get profile by the ID' })
    @ApiResponse({ status: 401, description: 'Access denied! Log in first!' })
    async getUser( @Param('id') id:string ) : Promise<Profile> {
        return await this.profilesService.getProfileById(id);
    }
}

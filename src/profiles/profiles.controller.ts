import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Profile } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService){}

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getUser( @Param('id') id:string ) : Promise<Profile> {
        return await this.profilesService.getProfileById(id);
    }
}

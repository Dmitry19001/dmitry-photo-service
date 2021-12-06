import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'Authorization/Login' })
  @ApiQuery({ name: 'password', type: 'string', required: true })
  @ApiQuery({ name: 'username', type: 'string', required: true })
  async login(@Request() req){
    const token = this.authService.login(req.user);
    return token;
    //return this.authService.validateUser(req.body.username, req.body.password);
  }
}

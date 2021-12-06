import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
    private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<User> {

    console.log('[AuthService] Validating username: ' + username);
    const user = await this.usersService.getUserByUsername(username);

    if (user && user.password === pass) {
      console.log('[AuthService] Found: ' + user.username + " ID:" + user.id);
      user.password = "";
      return user;
    }
    return null;
  }

  async login(user: User) {
    console.log('[AuthService] Log in username: ' + user.username + " ID:" + user.id);
    const payload = {username: user.username, sub: user.id};
    return { accessToken: this.jwtService.sign(payload) };
  }

}

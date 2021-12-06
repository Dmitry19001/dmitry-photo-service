import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
    private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<User> {

    const user = await this.usersService.getUserByUsername(username);

    if (user && user.password === pass) {
      const result = user;
      result.password = "";
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {username: user.username, sub: user.id};
    return { accessToken:this.jwtService.sign(payload) };
  }

}

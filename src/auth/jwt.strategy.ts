import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { jwtConstants } from "./auth.constants";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService,
        private readonly usersService: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }
    
    async validate(payload: any): Promise<User> {
        console.log("[JWT Service] validate username: " + payload.username + " sub: " + payload.sub + " token: " + payload)
        const user = this.usersService.getUserById(payload.sub);
        (await user).password = "";
        return user;
        // return {id: payload.sub, username: payload.username};
    }
}
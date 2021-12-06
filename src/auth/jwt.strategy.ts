import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "My-very-secret-passphrase"
        })
    }
    
    async validate(payload: any): Promise<any> {
        console.log("jwt validate username: " + payload.username + " sub: " + payload.sub)
        return {id: payload.sub, username: payload.username};
    }
}
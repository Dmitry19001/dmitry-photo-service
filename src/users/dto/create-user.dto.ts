import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: "sample@sample.com"})
    @IsEmail()
    username: string;

    @ApiProperty({example: "qwerty"})
    @IsString()
    password: string;

    @ApiProperty({example: "Sample"})
    @IsString()
    name: string;

    @ApiProperty({example: {gender: {enum: ["Male", "Female", "Other"]}, photo: "url_here"}})
    profile: {
        gender: string;
        photo: string;
    }
}
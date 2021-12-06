import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePhotoDto {
    @ApiProperty({example: "Lake", description: "Name of the photo"})
    @IsString()
    name: string;

    @ApiProperty({example: "Nice view of a lake", description: "Description of the photo"})
    @IsString()
    description: string;

    @ApiProperty({example: "photo_url", description: "Url path to the photo"})
    @IsString()
    url: string;

    @ApiProperty({example: "sample@sample.com", description: "Username of a uploader of the photo"})
    username: string;

    @ApiProperty({ type: [String], example: ["Nature"]})
    categories: string[];
}
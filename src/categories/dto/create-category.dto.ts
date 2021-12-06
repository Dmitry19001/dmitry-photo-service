import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({example: "Nature", description: "Name of the category"})
    @IsString()
    name: string;

    @ApiProperty({example: "Contains a great view of nature", description: "Description of the category"})
    @IsString()
    description: string;
}